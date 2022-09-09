import StateSelector from '../../main-process/selectors/state-selector';
import Syno from '../../main-process/syntactic-interface/newnew/readable/syno';

export type SynoValidators = Readonly<
  {
    [syntype: string]: (
      syno: Syno,
      state: StateSelector,
    ) => boolean;
  }
>;
