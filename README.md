<div>
  <h1 align="center">⚡ Storybook SolidJS</h1>
  <strong>
    A framework to allow using <a href="https://storybook.js.org/">Storybook</a> with <a href="https://www.solidjs.com/">SolidJS</a>
  </strong>
</div>

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
[![npm version][npm-badge-renderer]][npm-renderer]
[![npm version][npm-badge-vite]][npm-vite]
[![MIT License][license-badge]][license]
<!-- prettier-ignore-end -->

## Features

- [x] `JS` and `TS` integration with Storybook CLI
- [x] Fine grained updates in storybook controls
- [x] Compatible with Storybook interactions
- [x] Compatible with `storybook/test`
- [x] Code snippets generation in docs view mode
- [ ] Automatic story actions
- [ ] Full props table with description in docs view mode
- [ ] `SolidJS` docs in the official Storybook website

## Notes about pending features ⏳

- **Automatic story actions**: Feature under research. For now actions can be implemented manually by using the `storybook/actions` API.

- **Full props table with description in docs view mode**: Feature under research. For now, props are rendered partially in the docs view table with a blank description.

- **`SolidJS` docs in the official Storybook website**: It's still pending to add documentation about Storybook stories definitions using SolidJS.

## Why This Fork?

The official Storybook SolidJS renderer has critical bugs that were not addressed for over a month after the release of Storybook 9, despite submitted patches. This fork provides a stable, working alternative for SolidJS developers who need reliable Storybook integration.

**Note**: The `npx storybook@latest init` command will install the official (buggy) renderer. Use the manual installation below for a working setup.

## Getting Started

### Installation

```bash
# Install dependencies
pnpm add -D @tzvipm.dev/storybook-solidjs @tzvipm.dev/storybook-solidjs-vite storybook

# Initialize Storybook
npx storybook@latest init --skip-install
```

### Configuration

Create or update your `.storybook/main.js`:

```js
export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  framework: '@tzvipm.dev/storybook-solidjs-vite',
  addons: [
    // Essential addons are now built into Storybook core
    // Add any additional addons you need here
  ],
};
```

### Writing Your First Story

Create a story file (e.g., `Button.stories.tsx`):

```tsx
import type { Meta, StoryObj } from '@tzvipm.dev/storybook-solidjs';
import { Button } from './Button';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};
```

### Running Storybook

```bash
# Start development server
pnpm storybook

# Build static Storybook
pnpm build-storybook
```

## Requirements

- **Node.js**: 18.0.0 or later
- **Storybook**: 9.0.0 or later
- **SolidJS**: ~1.9.0
- **Vite**: 4.0.0 or later (supports v4, v5, and v6)

## TypeScript Support

Full TypeScript support is included out of the box. The types for `Meta` and `StoryObj` are specifically designed for SolidJS components, providing excellent IDE support and type safety.

## Testing

For testing with Storybook, please refer to the [official Storybook 9 testing documentation](https://storybook.js.org/docs/writing-tests).

The only differences when using SolidJS are:

- Import `Meta` and `StoryObj` types from `@tzvipm.dev/storybook-solidjs`
- Use the SolidJS-specific setup shown in the examples above

All other testing features work exactly as documented in the official Storybook docs.

## Advanced Configuration

### Custom Vite Config

Your existing `vite.config.ts` is automatically used. To customize Vite config specifically for Storybook:

```js
// .storybook/main.js
export default {
  framework: '@tzvipm.dev/storybook-solidjs-vite',
  viteFinal: async (config) => {
    // Customize the Vite config here
    return config;
  },
};
```

### Fine-grained Reactivity

SolidJS's fine-grained reactivity works perfectly with Storybook controls. When you change a control value, only the affected parts of your component re-render.

## Troubleshooting

### Common Issues

1. **HMR not working**: Ensure you're using a supported version of Vite (4.x, 5.x, or 6.x)
2. **Type errors**: Make sure you're importing types from `@tzvipm.dev/storybook-solidjs`
3. **Build errors**: Check that all peer dependencies are installed

For more help, please [open an issue](https://github.com/TzviPM/storybook-solidjs/issues) on our GitHub repository.

## License

MIT

<!-- prettier-ignore-start -->
[npm-badge-renderer]: https://img.shields.io/npm/v/@tzvipm.dev/storybook-solidjs.svg?style=flat-square
[npm-renderer]: https://npmjs.org/package/@tzvipm.dev/storybook-solidjs
[npm-badge-vite]: https://img.shields.io/npm/v/@tzvipm.dev/storybook-solidjs-vite.svg?style=flat-square
[npm-vite]: https://npmjs.org/package/@tzvipm.dev/storybook-solidjs-vite
[license-badge]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[license]: https://github.com/TzviPM/storybook-solidjs/blob/main/LICENSE
<!-- prettier-ignore-end -->
