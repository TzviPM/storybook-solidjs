# Releasing Guide

This document describes the process for making releases to npm for the Storybook SolidJS packages.

## Prerequisites

- You must have npm publish permissions for the `@storybook-solidjs` packages
- You must be on the `main` branch with a clean working directory
- All CI checks must be passing

## Commit Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/) to automate versioning and changelog generation. Each commit message should follow this format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

- **feat**: A new feature (triggers minor version bump)
- **fix**: A bug fix (triggers patch version bump)
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, semicolons, etc)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvements
- **test**: Adding or correcting tests
- **chore**: Changes to build process or auxiliary tools
- **ci**: Changes to CI configuration files and scripts

### Breaking Changes

To indicate a breaking change (triggers major version bump), add `BREAKING CHANGE:` in the commit footer or append `!` after the type:

```
feat!: remove deprecated API

BREAKING CHANGE: The deprecated `useStore` API has been removed.
Use `createStore` instead.
```

### Examples

```bash
# Feature
feat: add TypeScript 5.0 support

# Bug fix
fix: correct SolidJS component re-rendering issue

# Breaking change
feat!: update to Storybook 8.0

BREAKING CHANGE: Requires Storybook 8.0 or higher
```

## Making Commits

Use the interactive commit tool to ensure proper formatting:

```bash
pnpm commit
```

This will guide you through creating a properly formatted commit message.

## Release Process

### 1. Run Quality Checks

Before releasing, ensure all checks pass:

```bash
pnpm check
```

This runs the self-check script that includes:

- Linting
- Formatting
- Tests
- TypeScript type checking
- Building all packages

### 2. Create a Changeset

For each change that should be included in the release:

```bash
pnpm changeset
```

This will prompt you to:

1. Select which packages have changed
2. Choose the version bump type (major/minor/patch)
3. Write a summary of the changes

The changeset will be saved in `.changeset/` directory.

### 3. Update Versions and Changelog

When ready to release, update package versions and generate changelogs:

```bash
pnpm version
```

This command:

- Consumes all changesets
- Updates package versions according to the changesets
- Updates CHANGELOG.md files
- Creates a commit with the version updates

### 4. Review and Commit

Review the changes made by the version command:

- Check that version bumps are correct
- Review the generated changelog entries
- Ensure all changed packages are included

If everything looks good, the changes will already be committed.

### 5. Create a Release

Push the changes and create a release:

```bash
# Push to main
git push

# Create and publish the release
pnpm release
```

The `pnpm release` command will:

1. Build all packages
2. Publish to npm with the `public` access level
3. Create git tags for each published package

### 6. Push Tags

After successful publication, push the tags:

```bash
git push --follow-tags
```

## CI/CD Integration

The repository has GitHub Actions workflows that:

- Run quality checks on every pull request
- Automatically create "Version Packages" PRs when changesets are merged to main
- Can be configured to auto-publish on merge (if desired)

## Troubleshooting

### Build Failures

If the build fails during release:

1. Run `pnpm check` to identify the issue
2. Fix any errors
3. Commit the fixes
4. Start the release process again

### Publishing Errors

If npm publish fails:

1. Check your npm authentication: `npm whoami`
2. Verify you have publish permissions
3. Check if the version already exists on npm
4. Ensure you're on the main branch

### Changeset Issues

If changesets aren't working correctly:

1. Ensure you have pending changesets: `pnpm changeset status`
2. Check the `.changeset/config.json` configuration
3. Verify you're on the correct base branch (main)

## Best Practices

1. **Atomic Commits**: Make small, focused commits with clear messages
2. **Test Locally**: Always run `pnpm check` before pushing
3. **Review Changelogs**: Ensure changelog entries are clear and user-friendly
4. **Coordinate Releases**: For major releases, coordinate with the team
5. **Document Breaking Changes**: Clearly document migration paths for breaking changes

## Getting Help

If you encounter issues with the release process:

1. Check the [Changesets documentation](https://github.com/changesets/changesets)
2. Review recent successful releases in the git history
3. Ask for help in the project's issue tracker or discussions
