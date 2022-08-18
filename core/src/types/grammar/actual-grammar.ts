import type { ProductionRule } from './production-rule';

export type ActualGrammar = Readonly<{
  nonTerminals: string[];
  terminals: string[];
  startingNonTerminal: string;
  productionRules: ProductionRule[];
}>;
