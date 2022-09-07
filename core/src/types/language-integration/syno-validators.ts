import Syno from '../../main-process/syntactic-interface/newnew/readable/syno';

import { StateSelector } from '../state-selector';

export type SynoValidators = Readonly<
  {
    [syntype: string]: (
      syno: Syno,
      state: StateSelector,
    ) => boolean;
  }
>;
