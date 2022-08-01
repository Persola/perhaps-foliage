export type GrammarSyntypeEntry = Readonly<{
  readonly rootable: boolean;
  readonly children: Readonly<
    Record<
      string,
      {
        readonly collection: boolean;
        readonly syntype: (string | string[]);
      }
    >
  >;
  readonly nonTreeRefs: Readonly<
    Record<string, string>
  >;
  readonly properties: Readonly<
    Record<string, string>
  >;
}>;
