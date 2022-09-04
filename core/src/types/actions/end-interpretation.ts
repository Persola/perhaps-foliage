import Syno from '../../main-process/syntactic-interface/newnew/syno';

export type EndInterpretation = {
  readonly type: 'END_INTERPRETATION';
  readonly result: Syno;
};
