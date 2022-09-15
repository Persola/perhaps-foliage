import type { SyntypeExtratreeRefs } from './syntactic-type-extratree-refs';
import type { SyntacticTypeAttrs } from './syntactic-type-attrs';

export type SyntacticTypeSchema = Readonly<{
  [syntypeName: string]: Readonly<{
    readonly extratreeRefs: Readonly<SyntypeExtratreeRefs>;
    readonly attrs: Readonly<SyntacticTypeAttrs>;
  }>;
}>;
