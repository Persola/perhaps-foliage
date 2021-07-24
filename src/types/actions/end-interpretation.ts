import type { Syno } from '../syntactic/syno';

export type EndInterpretation = {
  readonly type: 'END_INTERPRETATION';
  readonly result: Syno;
};
