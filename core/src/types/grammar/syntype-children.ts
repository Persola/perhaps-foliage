export type SyntypeChildren = Readonly<
  Record<
    string,
    {
      readonly collection: boolean;
      readonly syntype: (string | string[]);
    }
  >
>;
