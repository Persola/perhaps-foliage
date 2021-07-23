import type { Syntype } from "../syntype";
export type FunctionParameterAttrs = {
  syntype: "functionParameter";
  name: string;
  valueSyntype: Syntype;
};