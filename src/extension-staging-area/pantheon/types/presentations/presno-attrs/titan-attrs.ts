import type { PresnoRef } from "../../../../../types/presenter/presno-ref";
export type TitanPresAttrs = {
  readonly syntype: "titan";
  readonly name: string;
  readonly child: PresnoRef | null | undefined;
  readonly focused: boolean;
  readonly presnoFocused: number | null | undefined;
  readonly charFocused: number | null | undefined;
  readonly valid: boolean;
};