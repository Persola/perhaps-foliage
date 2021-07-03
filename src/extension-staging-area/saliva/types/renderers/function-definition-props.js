// @flow
import * as React from 'react';

import type { SynoId } from '../../../../types/syno-id';
import type { GrammarName } from '../../../../types/editor-state/grammar-name';
import type { Presno } from '../../../../types/presenter/presno';
import type { SynoRendererProps } from '../../../../types/syno-renderer-props';
import type { FunctionDefPres } from '../presentations/function-definition';

export type FunctionDefinitionRendererProps = {|
  +grammarName: GrammarName,
  +getPresno: (SynoId) => Presno,
  +presno: FunctionDefPres,
  +SynoRenderer: (props: SynoRendererProps) => React.Node,
|}
