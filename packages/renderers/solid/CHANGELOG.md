# @tzvipm.dev/storybook-solidjs

## 1.0.2

### Patch Changes

- 682ba44: docs: Update documentation to reflect Storybook 9 package structure changes
  - Remove references to deprecated packages (@storybook/addon-essentials, @storybook/addon-interactions, @storybook/addon-actions)
  - Update imports from @storybook/test to storybook/test
  - Direct users to official Storybook 9 testing documentation
  - Note that essential addons are now built into Storybook core

## 1.0.1

### Patch Changes

- d0ae5d0: fix: update preset to use ESM \_\_dirname replacement

  Replace Node.js `__dirname` with ESM-compatible implementation using `import.meta.url` to fix module loading issues in ESM environments.

## 1.0.0

### Major Changes

- e17d479: Fix many bugs and maintain my own fork

### Minor Changes

- e17d479: Switch from tsup to vite

### Patch Changes

- e164172: Initial fork
