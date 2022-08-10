import type { GrammarSyntypeEntry } from './syntype';

export type Grammar = Readonly<{
  [syntype: string]: GrammarSyntypeEntry
}>;
