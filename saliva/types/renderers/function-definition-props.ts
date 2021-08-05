import * as React from 'react';

import type { SynoId } from '../../../src/types/syntactic/syno-id';
import type { PresentLanguageIntegration } from '../../../src/types/language-integration/present-language-integration';
import type { Presno } from '../../../src/types/presenter/presno';
import type { SynoRendererProps } from '../../../src/types/renderer/syno-renderer-props';
import type { FunctionDefPres } from '../presentations/function-definition';

export type FunctionDefinitionRendererProps = {
  readonly integration: PresentLanguageIntegration;
  readonly getPresno: (synoId: SynoId) => Presno;
  readonly presno: FunctionDefPres;
  readonly SynoRenderer: (props: SynoRendererProps) => React.ReactElement;
};
