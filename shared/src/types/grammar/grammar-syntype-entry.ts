export type GrammarSyntypeEntry = Readonly<{
  readonly rootable: boolean;
  readonly textHostRef: string | null;
  readonly children: Readonly<
    Record<
      string,
      {
        readonly collection: boolean;
        readonly syntype: (string | string[]);
      }
    >
  >;
  readonly nonTreeRefs: Readonly<string[]>;
  readonly properties: Readonly<
    Record<string, string>
  >;
}>;
