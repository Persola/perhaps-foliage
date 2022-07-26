import type { Renderer } from './renderer';
import type { IntegrationDependencies } from './integration-dependencies';

export type RendererCreator = (integrationDependencies: IntegrationDependencies) => Renderer;
