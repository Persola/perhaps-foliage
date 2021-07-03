// @flow
import * as React from 'react';

import type { SynoId } from '../../../../types/syno-id';
import type { GrammarName } from '../../../../types/editor-state/grammar-name';
import type { Presno } from '../../../../types/presenter/presno';
import type { SynoRendererProps } from '../../../../types/syno-renderer-props';
import type { BooleanLiteralPres } from '../presentations/boolean-literal';

export type BooleanLiteralRendererProps = {|
  +grammarName: GrammarName,
  +getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  +presno: BooleanLiteralPres,
  +SynoRenderer: (props: SynoRendererProps) => React.Node,
|}
