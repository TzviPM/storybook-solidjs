import type { Meta, StoryObj } from '@tzvipm.dev/storybook-solidjs';
import { Logos } from '.';

const meta: Meta<typeof Logos> = {
  component: Logos,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
};
export default meta;

type Story = StoryObj<typeof Logos>;

export const Default: Story = {};
