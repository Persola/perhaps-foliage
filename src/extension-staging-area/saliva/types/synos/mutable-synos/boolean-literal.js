// @flow
import type { CoreSynoAttrs } from '../core-syno-attrs';
import type { BooleanLiteralAttrs } from '../syno-attrs/boolean-literal-attrs';

export type MutableBooleanLiteral = {|
  ...CoreSynoAttrs,
  ...BooleanLiteralAttrs,
|}
