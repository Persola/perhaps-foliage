import * as React from 'react';

import type { SynoId } from '../../../src/types/syntactic/syno-id';
import type { Presno } from '../../../src/types/presenter/presno';
import type { PresentLanguageIntegration } from '../../../src/types/language-integration/present-language-integration';
import type { SynoRendererProps } from '../../../src/types/renderer/syno-renderer-props';
import type { VariableRefPres } from '../presentations/variable-ref';

export type VariableRefRendererProps = {
  readonly integration: PresentLanguageIntegration;
  readonly getPresno: (synoId: SynoId) => Presno;
  // eslint-disable-line react/no-unused-prop-types
  readonly presno: VariableRefPres;
  readonly SynoRenderer: (props: SynoRendererProps) => React.ReactElement;
};
