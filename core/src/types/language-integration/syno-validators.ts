import StateSelector from '../../main-process/state-interface/state-selector';
import Syno from '../../main-process/state-interface/syntactic-interface/readable/syno';

export type SynoValidators = Readonly<
  {
    [syntype: string]: (
      syno: Syno,
      state: StateSelector,
    ) => boolean;
  }
>;
