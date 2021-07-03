// @flow
import type { CoreSynoAttrs } from '../core-syno-attrs';
import type { VariableRefAttrs } from '../syno-attrs/variable-ref-attrs';

export type MutableVariableRef = {|
  ...CoreSynoAttrs,
  ...VariableRefAttrs,
|}
