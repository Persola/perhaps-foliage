import * as React from 'react';
import type { RendersidePresentLangInt } from '../language-integration/interfaces/renderside/renderside-present-lang-int';
import type { GetPresno } from './get-presno';

export type PresnoRendererProps = {
  readonly integration: RendersidePresentLangInt;
  readonly getPresno: GetPresno;
  readonly presnoId: string;
  readonly PresnoRenderer: (props: PresnoRendererProps) => React.ReactElement;
};
