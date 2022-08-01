import type { Syno } from '../syntactic/syno';

export type InterpretationResolutionSuccess = {
  readonly success: true;
  readonly result: Syno;
};
