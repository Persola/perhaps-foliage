import * as React from 'react';

import type { SynoId } from '../../../src/types/syntactic/syno-id';
import type { PresentLanguageIntegration } from '../../../src/types/language-integration/present-language-integration';
import type { Presno } from '../../../src/types/presenter/presno';
import type { SynoRendererProps } from '../../../src/types/renderer/syno-renderer-props';
import type { FunctionParameterPres } from '../presentations/function-parameter';

export type FunctionParameterRendererProps = {
  readonly integration: PresentLanguageIntegration;
  readonly getPresno: (synoId: SynoId) => Presno;
  // eslint-disable-line react/no-unused-prop-types
  readonly presno: FunctionParameterPres;
  readonly SynoRenderer: (props: SynoRendererProps) => React.ReactElement;
};
