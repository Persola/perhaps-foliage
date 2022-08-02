import type { Renderer } from './renderer';

export type Renderers = Readonly<{
  [syntype: string]: Renderer;
}>;
