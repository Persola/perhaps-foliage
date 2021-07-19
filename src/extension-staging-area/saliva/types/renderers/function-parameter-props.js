// @flow
import * as React from 'react';

import type { NamePartProps } from '../../../../types/renderer/name-part-props';
import type { SynoId } from '../../../../types/syno-id';
import type { PresentLanguageIntegration } from '../../../../types/language-integration/present-language-integration';
import type { Presno } from '../../../../types/presenter/presno';
import type { SynoRendererProps } from '../../../../types/renderer/syno-renderer-props';
import type { FunctionParameterPres } from '../presentations/function-parameter';

export type FunctionParameterRendererProps = {|
  +NamePart: React.ComponentType<NamePartProps>,
  +integration: PresentLanguageIntegration,
  +getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  +presno: FunctionParameterPres,
  +SynoRenderer: (props: SynoRendererProps) => React.Node,
|}
