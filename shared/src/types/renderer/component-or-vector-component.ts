import type { SharedRendererProps } from './shared-renderer-props';

export type ComponentOrVectorComponent = (
  (parentProps: SharedRendererProps) => React.ReactElement | React.ReactElement[]
);
