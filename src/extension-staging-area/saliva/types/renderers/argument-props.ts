import * as React from 'react';

import type { PresentLanguageIntegration } from '../../../../types/language-integration/present-language-integration';
import type { Presno } from '../../../../types/presenter/presno';
import type { SynoId } from '../../../../types/syntactic/syno-id';
import type { SynoRendererProps } from '../../../../types/renderer/syno-renderer-props';
import type { ArgumentPres } from '../presentations/argument';

export type ArgumentRendererProps = {
  readonly integration: PresentLanguageIntegration;
  readonly getPresno: (synoId: SynoId) => Presno;
  // eslint-disable-line react/no-unused-prop-types
  readonly presno: ArgumentPres;
  readonly SynoRenderer: (props: SynoRendererProps) => React.ReactElement;
};
