import Syno from '../../main-process/syntactic-interface/newnew/syno';

import { StateSelector } from '../state-selector';

export type SynoValidators = Readonly<
  {
    [syntype: string]: (
      syno: Syno,
      state: StateSelector,
    ) => boolean;
  }
>;
