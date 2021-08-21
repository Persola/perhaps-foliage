import type { Grammar } from '../grammar/grammar';
import type { SynoMap } from '../syntactic/syno-map';
import type { KeyToNewSynoAttrs } from './key-to-new-syno-attrs';
import type { Interpret } from './interpret';
import type { Presenters } from './presenters';

export type CoresidePresentLanguageIntegration = {
  id: string;
  grammar: Grammar;
  primitives: SynoMap | null;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  interpret: Interpret | null;
  presenters: Presenters;
};
