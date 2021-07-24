import type { Syntype } from "../../extension-staging-area/saliva/types/synos/syntype";
export type Grammar = Readonly<
  Record<
    Syntype,
    {
      readonly rootable: boolean;
      readonly textHostRef: string | null | undefined;
      readonly children: Readonly<
        Record<
          string,
          {
            readonly collection: boolean;
            readonly syntype: Syntype;
          }
        >
      >;
    }
  >
>;
