import type { GrammarSyntypeEntry } from './grammar-syntype-entry';

export type Grammar = Readonly<{
  [syntype: string]: GrammarSyntypeEntry
}>;
