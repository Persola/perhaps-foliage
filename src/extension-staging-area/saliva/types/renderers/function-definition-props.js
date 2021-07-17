// @flow
import * as React from 'react';

import type { SynoId } from '../../../../types/syno-id';
import type { LanguageIntegration } from '../../../../types/language-integration';
import type { Presno } from '../../../../types/presenter/presno';
import type { SynoRendererProps } from '../../../../types/syno-renderer-props';
import type { FunctionDefPres } from '../presentations/function-definition';

export type FunctionDefinitionRendererProps = {|
  +integration: LanguageIntegration,
  +getPresno: (SynoId) => Presno,
  +presno: FunctionDefPres,
  +SynoRenderer: (props: SynoRendererProps) => React.Node,
|}
