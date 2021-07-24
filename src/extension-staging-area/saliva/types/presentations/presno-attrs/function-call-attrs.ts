import type { PresnoRef } from "../../../../../types/presenter/presno-ref";
export type FunctionCallPresAttrs = {
  readonly syntype: "functionCall";
  readonly focused: boolean;
  readonly presnoFocused: number | null | undefined;
  readonly charFocused: number | null | undefined;
  readonly valid: boolean;
  readonly name: string | null | undefined;
  readonly argumentz: PresnoRef[];
  readonly callee: PresnoRef | null | undefined;
  readonly resolved: boolean;
};
