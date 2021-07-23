// @flow
import * as React from 'react';

import type { SynoId } from '../../../../types/syno-id';
import type { PresentLanguageIntegration } from '../../../../types/language-integration/present-language-integration';
import type { Presno } from '../../../../types/presenter/presno';
import type { SynoRendererProps } from '../../../../types/renderer/syno-renderer-props';
import type { BooleanLiteralPres } from '../presentations/boolean-literal';

export type BooleanLiteralRendererProps = {|
  +integration: PresentLanguageIntegration,
  +getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  +presno: BooleanLiteralPres,
  +SynoRenderer: (props: SynoRendererProps) => React.Node,
|}