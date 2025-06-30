import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync } from 'fs';

// Get all TypeScript entry points
const entries = readdirSync(resolve(__dirname, 'src'))
  .filter((file) => file.endsWith('.ts'))
  .reduce(
    (acc, file) => {
      const name = file.replace(/\.ts$/, '');
      acc[name] = resolve(__dirname, 'src', file);
      return acc;
    },
    {} as Record<string, string>,
  );

export default defineConfig({
  build: {
    lib: {
      entry: entries,
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'mjs' : 'js';
        return `${entryName}.${ext}`;
      },
    },
    rollupOptions: {
      external: [
        'storybook',
        /^storybook\//,
        '@storybook/builder-vite',
        '@tzvipm.dev/storybook-solidjs',
        'vite-plugin-solid',
        'node:path',
      ],
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: false,
  },
});
