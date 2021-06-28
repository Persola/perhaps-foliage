// @flow
import * as React from 'react';

import type { SynoId } from '../../../../types/syno-id';
import type { GrammarName } from '../../../../types/editor-state/grammar-name';
import type { Presno } from '../../../../types/presenter/presno';
import type { SynoRendererProps } from '../../../../types/syno-renderer-props';
import type { FunctionCallPres } from '../presentations/function-call';

export type FunctionCallRendererProps = {
  grammarName: GrammarName,
  getPresno: (SynoId) => Presno,
  presno: FunctionCallPres,
  SynoRenderer: (props: SynoRendererProps) => React.Node
}
