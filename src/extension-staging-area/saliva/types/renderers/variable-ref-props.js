// @flow
import * as React from 'react';

import type { SynoId } from '../../../../types/syno-id';
import type { Presno } from '../../../../types/presenter/presno';
import type { GrammarName } from '../../../../types/editor-state/grammar-name';
import type { SynoRendererProps } from '../../../../types/syno-renderer-props';
import type { VariableRefPres } from '../presentations/variable-ref';

export type VariableRefRendererProps = {
  grammarName: GrammarName,
  getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  presno: VariableRefPres,
  SynoRenderer: (props: SynoRendererProps) => React.Node
}
