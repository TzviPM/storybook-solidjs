import type { Component, JSXElement } from 'solid-js';
import type { Args, WebRenderer } from 'storybook/internal/types';

export type { RenderContext } from 'storybook/internal/types';
export type { StoryContext } from 'storybook/internal/types';

export interface SolidRenderer extends WebRenderer {
  // @ts-expect-error Component expects a record, but TArgs are unknown.
  component: Component<this['T']>;
  storyResult: StoryFnSolidReturnType;
}

export interface ShowErrorArgs {
  title: string;
  description: string;
}

export type StoryFnSolidReturnType = JSXElement;
export type ComponentsData = {
  [key: string]: { args: Args; rendered?: boolean; disposeFn?: () => void };
};
