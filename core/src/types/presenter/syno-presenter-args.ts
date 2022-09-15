import StateSelector from '../../main-process/state-interface/state-selector';
import Syno from '../../main-process/state-interface/syntactic-interface/readable/syno';

export type SynoPresenterArgs = {
  syno: Syno,
  _: StateSelector,
};
