import { join, resolve } from 'node:path';

import type { Metafile } from 'esbuild';
import aliasPlugin from 'esbuild-plugin-alias';
import { solidPlugin } from 'esbuild-plugin-solid';
import * as fs from 'fs-extra';
import { fdir } from 'fdir';
import { build, Format, type Options } from 'tsup';
import type { PackageJson } from 'type-fest';

import * as esbuild from 'esbuild';

/* TYPES */

type Formats = 'esm' | 'cjs';
type BundlerConfig = {
  entries: string[];
  externals: string[];
  noExternal: string[];
  platform: Options['platform'];
  pre: string;
  post: string;
  formats: Formats[];
};
type PackageJsonWithBundlerConfig = PackageJson & {
  bundler: BundlerConfig;
};
type DtsConfigSection = Pick<Options, 'dts' | 'tsconfig'>;

/* MAIN */

const OUT_DIR = join(process.cwd(), 'dist');

const run = async ({ cwd }: { cwd: string }) => {
  const packageJson = Bun.file(join(cwd, 'package.json'));

  const {
    name,
    dependencies,
    peerDependencies,
    bundler: {
      entries = [],
      platform,
    },
  } = await packageJson.json() as PackageJsonWithBundlerConfig;

  if (!name) throw 'No package name found!';

  const metafilesDir = join(
    __dirname,
    '..',
    '..',
    'bench',
    'esbuild-metafiles',
    name,
  );

  await fs.emptyDir(OUT_DIR);
  await fs.emptyDir(metafilesDir);

  const externals = [
    name,
    ...Object.keys(dependencies || {}),
    ...Object.keys(peerDependencies || {}),
  ];

  const allEntries = entries.map((e: string) => join(cwd, e));

  const dtsConfig: DtsConfigSection = {
    tsconfig: join(cwd, 'tsconfig.json'),
    dts: {
      entry: entries,
      resolve: true,
    },
  };

  const outExtension = ({ format }: { format: Format }) => {
    if (format == 'esm') return { js: '.mjs' };
    return { js: '.js' };
  };

  await build({
    noExternal: [],
    silent: true,
    treeshake: true,
    entry: allEntries,
    shims: false,
    outDir: OUT_DIR,
    sourcemap: false,
    metafile: true,
    format: ['esm', 'cjs'],
    target:
      platform === 'node' ? ['node18'] : ['chrome100', 'safari15', 'firefox91'],
    clean: false,
    ...dtsConfig,
    platform: platform || 'browser',
    plugins:
      platform === 'node'
        ? [solidPlugin()]
        : [
            solidPlugin(),
            aliasPlugin({
              process: resolve('../node_modules/process/browser.js'),
              util: resolve('../node_modules/util/util.js'),
            }),
          ],
    external: externals,
    outExtension,

    esbuildOptions: (c) => {
      c.conditions = ['module'];
      c.platform = platform || 'browser';
      Object.assign(c, getESBuildOptions());
    },
  });

  await saveMetafiles({ metafilesDir, formats: ['esm', 'cjs'] });

  const dtsFiles = await new fdir()
    .withFullPaths()
    .glob('/**/*.d.ts')
    .crawl(OUT_DIR)
    .withPromise();
  await Promise.all(
    dtsFiles.map(async (file) => {
      const content = await fs.readFile(file, 'utf-8');
      await fs.writeFile(
        file,
        content.replace(
          /from 'core\/dist\/(.*)'/g,
          `from 'storybook/internal/$1'`,
        ),
      );
    }),
  );

  if (process.env.CI !== 'true') {
    console.log('done');
  }
};

/* UTILS */

function getESBuildOptions() {
  return {
    logLevel: 'error',
    legalComments: 'none',
    minifyWhitespace: true,
    minifyIdentifiers: false,
    minifySyntax: true,
  };
}

async function saveMetafiles({
  metafilesDir,
  formats,
}: {
  metafilesDir: string;
  formats: Formats[];
}) {
  await fs.ensureDir(metafilesDir);
  const metafile: Metafile = {
    inputs: {},
    outputs: {},
  };

  await Promise.all(
    formats.map(async (format) => {
      const fromFilename = `metafile-${format}.json`;
      const fromFile = Bun.file(join(OUT_DIR, fromFilename));
      const currentMetafile = await fromFile.json();
      metafile.inputs = { ...metafile.inputs, ...currentMetafile.inputs };
      metafile.outputs = { ...metafile.outputs, ...currentMetafile.outputs };

      await fromFile.delete();
    }),
  );

  await Bun.write(
    join(metafilesDir, 'metafile.json'),
    JSON.stringify(metafile, null, 2),
  );
  await Bun.write(
    join(metafilesDir, 'metafile.txt'),
    await esbuild.analyzeMetafile(metafile, { color: false, verbose: false }),
  );
}

/* SELF EXECUTION */

const cwd = process.cwd();

run({ cwd }).catch((err: unknown) => {
  // We can't let the stack try to print, it crashes in a way that sets the exit code to 0.
  // Seems to have something to do with running JSON.parse() on binary / base64 encoded sourcemaps
  // in @cspotcode/source-map-support
  if (err instanceof Error) {
    console.error(err.stack);
  }
  process.exit(1);
});
