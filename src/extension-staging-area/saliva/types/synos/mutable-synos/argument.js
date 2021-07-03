// @flow
import type { CoreSynoAttrs } from '../core-syno-attrs';
import type { ArgumentAttrs } from '../syno-attrs/argument-attrs';

export type MutableArgument = {|
  ...CoreSynoAttrs,
  ...ArgumentAttrs,
|}
