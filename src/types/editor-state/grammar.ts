export type Grammar = Readonly<{
  [syntype: string]: {
    readonly rootable: boolean;
    readonly textHostRef: string | null;
    readonly children: Readonly<
      Record<
        string,
        {
          readonly collection: boolean;
          readonly syntype: string;
        }
      >
    >;
  }
}>;
