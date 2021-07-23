import type { PresnoRef } from "../../../../../types/presenter/presno-ref";
export type ArgumentPresAttrs = {
  readonly syntype: "argument";
  readonly focused: boolean;
  readonly presnoFocused: number | null | undefined;
  readonly charFocused: number | null | undefined;
  readonly valid: boolean;
  readonly name: string | null | undefined;
  readonly value: PresnoRef | null | undefined;
};