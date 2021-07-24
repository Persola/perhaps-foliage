import * as React from 'react';
import type { SynoId } from '../../../../types/syno-id';
import type { PresentLanguageIntegration } from '../../../../types/language-integration/present-language-integration';
import type { Presno } from '../../../../types/presenter/presno';
import type { SynoRendererProps } from '../../../../types/renderer/syno-renderer-props';
import type { BooleanLiteralPres } from '../presentations/boolean-literal';

export type BooleanLiteralRendererProps = {
  readonly integration: PresentLanguageIntegration;
  readonly getPresno: (arg0: SynoId) => Presno;
  // eslint-disable-line react/no-unused-prop-types
  readonly presno: BooleanLiteralPres;
  readonly SynoRenderer: (props: SynoRendererProps) => React.ReactNode;
};
