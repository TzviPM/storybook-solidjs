import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { resolve } from 'path';
import { readdirSync } from 'fs';

// Get browser entry points (exclude preset.ts which is Node-only)
const entries = readdirSync(resolve(__dirname, 'src'))
  .filter(file => (file.endsWith('.ts') || file.endsWith('.tsx')) && file !== 'preset.ts')
  .reduce((acc, file) => {
    const name = file.replace(/\.(ts|tsx)$/, '');
    acc[name] = resolve(__dirname, 'src', file);
    return acc;
  }, {} as Record<string, string>);

export default defineConfig({
  plugins: [
    solidPlugin({
      solid: {
        generate: 'dom',
        hydratable: false,
      }
    })
  ],
  build: {
    lib: {
      entry: entries,
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'mjs' : 'js';
        return `${entryName}.${ext}`;
      }
    },
    rollupOptions: {
      external: [
        'solid-js',
        'solid-js/web',
        'solid-js/store',
        'storybook',
        /^storybook\//,
        '@storybook/global',
        'async-mutex',
        '@babel/standalone',
        'node:path'
      ],
      output: {
        globals: {
          'solid-js': 'SolidJS',
          'solid-js/web': 'SolidJSWeb',
          'solid-js/store': 'SolidJSStore'
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: false
  },
  resolve: {
    conditions: ['module'],
  }
});