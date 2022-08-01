import type { MutableSyntypeAttrs } from '../syntactic/mutables/mutable-syntype-attrs';

export type KeyToNewSynoAttrs = Readonly<{
  [input: string]: MutableSyntypeAttrs;
}>;
