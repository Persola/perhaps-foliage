import * as React from 'react';
import type { RendersidePresentLanguageIntegration } from '../language-integration/renderside-present-language-integration';
import type { SynoId } from '../syntactic/syno-id';
import type { GetPresno } from './get-presno';

export type PresnoRendererProps = {
  readonly integration: RendersidePresentLanguageIntegration;
  readonly getPresno: GetPresno;
  readonly synoId: SynoId;
  readonly PresnoRenderer: (props: PresnoRendererProps) => React.ReactElement;
};
