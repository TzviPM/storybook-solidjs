/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from 'tsup'
import { solidPlugin } from 'esbuild-plugin-solid'

export default defineConfig({
  entry: [
    "./src/index.ts",
    "./src/preset.ts",
    "./src/entry-preview.tsx",
    "./src/entry-preview-docs.tsx"
  ],  
  splitting: false,
  minify: 'terser',
  esbuildPlugins: [solidPlugin() as any]
});