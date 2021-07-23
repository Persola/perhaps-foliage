import type { Syntype } from "../../synos/syntype";
export type FunctionParameterPresAttrs = {
  readonly syntype: "functionParameter";
  readonly focused: boolean;
  readonly presnoFocused: number | null | undefined;
  readonly charFocused: number | null | undefined;
  readonly slot: string;
  readonly valueSyntype: Syntype;
};