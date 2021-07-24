import type { SynoRef } from '../../../../../types/syntactic/syno-ref';
import type { Syntype } from '../syntype';

export type ArgumentAttrs = {
  syntype: 'argument';
  valueSyntype: Syntype | null;
  value: SynoRef | null;
  parameter: SynoRef | null;
};
