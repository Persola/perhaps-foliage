// @flow
import * as React from 'react';

import type { GrammarName } from './editor-state/grammar-name';
import type { SynoId } from './syno-id';
import type { Presno } from './presenter/presno';

export type SynoRendererProps = {
  grammarName: GrammarName,
  getPresno: (SynoId) => Presno,
  synoId: SynoId,
  SynoRenderer: (props: SynoRendererProps) => React.Node
}
