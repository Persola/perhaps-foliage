export type ProductionRule = Readonly<{
  lhs: string;
  rhs: Readonly<{
    parent: string,
    children: Array<
      Readonly<{
        edgeLabel: string,
        childNonTerminal: string,
      }>
    >,
  }>,
}>;
