// @flow
import * as React from 'react';

import type { SynoId } from '../../../../types/syno-id';
import type { GrammarName } from '../../../../types/editor-state/grammar-name';
import type { Presno } from '../../../../types/presenter/presno';
import type { SynoRendererProps } from '../../../../types/syno-renderer-props';
import type { FunctionParameterPres } from '../presentations/function-parameter';

export type FunctionParameterRendererProps = {
  grammarName: GrammarName,
  getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  presno: FunctionParameterPres,
  SynoRenderer: (props: SynoRendererProps) => React.Node
}
