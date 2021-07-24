import type { InterpretationError } from "./interpretation-error";
export type InterpretationResolutionFailure = {
  readonly success: false;
  readonly error: InterpretationError;
};
