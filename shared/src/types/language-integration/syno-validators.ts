import { Syno } from '../syntactic/syno';
import { StateSelector } from '../state-selector';

export type SynoValidators = Readonly<
  {
    [syntype: string]: (
      syno: Syno,
      state: StateSelector,
    ) => boolean;
  }
>;
