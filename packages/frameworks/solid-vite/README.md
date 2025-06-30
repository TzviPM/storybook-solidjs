<div>
  <h1 align="center">⚡ @tzvipm.dev/storybook-solidjs-vite</h1>
  <strong>
    Storybook for SolidJS and Vite: Develop SolidJS components in isolation with Hot Reloading
  </strong>
</div>

```
pnpm add -D @tzvipm.dev/storybook-solidjs-vite
```

<div align="center">
  <a
    alt="TzviPM Logo"
    href="https://www.tzvipm.dev"
  >
    <img
      width="200px"
      src="https://www.tzvipm.dev/logo.svg"
    />
  </a>
</div>

<hr />

<!-- prettier-ignore-start -->
[![npm version][npm-badge]][npm]
[![MIT License][license-badge]][license]
<!-- prettier-ignore-end -->

## What is this?

This package provides the official framework integration between Storybook and Vite for SolidJS projects. It enables fast HMR, optimized builds, and seamless integration with Vite's ecosystem.

## Getting Started

Visit our [GitHub repository](https://github.com/TzviPM/storybook-solidjs) for comprehensive documentation and setup instructions.

## Features

- ⚡ **Lightning Fast** - Powered by Vite's blazing fast HMR
- 🔧 **Zero Config** - Works out of the box with your Vite config
- 📦 **Optimized Builds** - Production-ready bundle optimization
- 🎯 **TypeScript Support** - First-class TS support with Vite
- 🔌 **Plugin Ecosystem** - Compatible with Vite plugins

## Requirements

- Vite 4.0.0 or later (supports Vite 4, 5, and 6)
- SolidJS ~1.9.0
- Storybook 9.0.0 or later

## Setup

This framework is automatically installed when you run `storybook init` in a Vite-based SolidJS project.

For manual installation:

```bash
pnpm add -D @tzvipm.dev/storybook-solidjs-vite @tzvipm.dev/storybook-solidjs
```

Then add it to your `.storybook/main.js`:

```js
export default {
  framework: '@tzvipm.dev/storybook-solidjs-vite',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
};
```

## License

MIT

<!-- prettier-ignore-start -->
[npm-badge]: https://img.shields.io/npm/v/@tzvipm.dev/storybook-solidjs-vite.svg?style=flat-square
[npm]: https://npmjs.org/package/@tzvipm.dev/storybook-solidjs-vite
[license-badge]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[license]: https://github.com/TzviPM/storybook-solidjs/blob/main/LICENSE
<!-- prettier-ignore-end -->
