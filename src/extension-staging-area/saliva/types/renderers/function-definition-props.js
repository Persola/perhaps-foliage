// @flow
import * as React from 'react';

import type { NamePartProps } from '../../../../types/renderer/name-part-props';
import type { SynoId } from '../../../../types/syno-id';
import type { PresentLanguageIntegration } from '../../../../types/language-integration/present-language-integration';
import type { Presno } from '../../../../types/presenter/presno';
import type { SynoRendererProps } from '../../../../types/renderer/syno-renderer-props';
import type { FunctionDefPres } from '../presentations/function-definition';

export type FunctionDefinitionRendererProps = {|
  +NamePart: React.ComponentType<NamePartProps>,
  +integration: PresentLanguageIntegration,
  +getPresno: (SynoId) => Presno,
  +presno: FunctionDefPres,
  +SynoRenderer: (props: SynoRendererProps) => React.Node,
|}
