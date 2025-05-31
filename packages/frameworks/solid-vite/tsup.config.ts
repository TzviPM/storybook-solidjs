/* eslint-disable @typescript-eslint/no-explicit-any */
import { solidPlugin } from 'esbuild-plugin-solid';
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    "./src/index.ts",
    "./src/preset.ts",
  ],  
  splitting: false,
  minify: 'terser',
  target: 'node22',
  esbuildPlugins: [solidPlugin() as any]
});