import type { TypeAttrs } from '../syntactic/newnew/type-attrs';

export type KeyToNewSynoAttrs = Readonly<{
  [input: string]: TypeAttrs;
}>;
