<div>
  <h1 align="center">⚡ @tzvipm.dev/storybook-solidjs</h1>
  <strong>
    Storybook SolidJS renderer for building UI components in isolation
  </strong>
</div>

```
pnpm add -D @tzvipm.dev/storybook-solidjs
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

This package provides the SolidJS renderer for Storybook. It allows you to develop and test SolidJS components in isolation with Storybook's powerful development environment.

## Getting Started

Visit our [GitHub repository](https://github.com/TzviPM/storybook-solidjs) for comprehensive documentation and setup instructions.

## Features

- 🎯 **Type-safe** - Full TypeScript support
- ⚡ **Fast Refresh** - Instant feedback with Vite HMR
- 🎨 **Interactive Controls** - Fine-grained component props manipulation
- 🧪 **Testing Support** - Works with `@storybook/test`
- 📝 **Auto-generated Docs** - Component documentation from your code

## Quick Example

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@tzvipm.dev/storybook-solidjs';
import { Button } from './Button';

const meta = {
  title: 'Example/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
```

## License

MIT

<!-- prettier-ignore-start -->
[npm-badge]: https://img.shields.io/npm/v/@tzvipm.dev/storybook-solidjs.svg?style=flat-square
[npm]: https://npmjs.org/package/@tzvipm.dev/storybook-solidjs
[license-badge]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[license]: https://github.com/TzviPM/storybook-solidjs/blob/main/LICENSE
<!-- prettier-ignore-end -->
