// @flow
import type { CoreSynoAttrs } from '../../../../../types/core-syno-attrs';
import type { ArgumentAttrs } from '../syno-attrs/argument-attrs';

export type MutableArgument = {|
  ...CoreSynoAttrs,
  ...ArgumentAttrs,
|}
