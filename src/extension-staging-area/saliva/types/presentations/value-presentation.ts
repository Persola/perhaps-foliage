import type { BooleanLiteralPres } from "./boolean-literal";
import type { FunctionCallPres } from "./function-call";
import type { FunctionDefPres } from "./function-definition";
export type valuePresentation = BooleanLiteralPres | FunctionCallPres | FunctionDefPres | null;