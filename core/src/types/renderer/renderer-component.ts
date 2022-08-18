import type { SynPresnoRendererProps } from './syn-presno-renderer-props';

export type RendererComponent = (
  (parentProps: SynPresnoRendererProps) => React.ReactElement
);
