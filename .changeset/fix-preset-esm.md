---
'@tzvipm.dev/storybook-solidjs': patch
---

fix: update preset to use ESM __dirname replacement

Replace Node.js `__dirname` with ESM-compatible implementation using `import.meta.url` to fix module loading issues in ESM environments.
