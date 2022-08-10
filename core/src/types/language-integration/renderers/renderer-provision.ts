import type { RendererConfig } from './renderer-config';
import type { Renderer } from '../../renderer/renderer';

export type RendererProvision = (
  | RendererConfig
  | Renderer
);
