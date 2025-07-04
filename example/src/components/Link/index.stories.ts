import type { Meta, StoryObj } from '@tzvipm.dev/storybook-solidjs';

import { fn } from 'storybook/test';

import { Link } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: 'Example/Link',
  component: Link,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/solid/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    href: '#',
    children: 'Link',
  },
};

export const Secondary: Story = {
  args: {
    href: '#',
    children: 'Link',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    href: '#',
    children: 'Link',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    href: '#',
    children: 'Link',
  },
};
