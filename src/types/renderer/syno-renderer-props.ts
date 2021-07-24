import * as React from 'react';
import type { PresentLanguageIntegration } from '../language-integration/present-language-integration';
import type { SynoId } from '../syntactic/syno-id';
import type { GetPresno } from './get-presno';

export type SynoRendererProps = {
  readonly integration: PresentLanguageIntegration;
  readonly getPresno: GetPresno;
  readonly synoId: SynoId;
  readonly SynoRenderer: (props: SynoRendererProps) => React.ReactElement;
};
