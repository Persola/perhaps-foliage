import type { Grammar } from '../grammar/grammar';
import type { SynoMap } from '../syntactic/syno-map';
import type { KeyToNewSynoAttrs } from './key-to-new-syno-attrs';
import type { Interpret } from './interpret';
import type { SynoValidators } from './syno-validators';
import type { Presenters } from './presenters';
import type { Renderers } from './renderers';

export type PresentLanguageIntegration = {
  id: string;
  grammar: Grammar;
  primitives: SynoMap | null;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  interpret: Interpret | null;
  synoValidators: SynoValidators;
  presenters: Presenters;
  renderers: Renderers;
  styles: string;
};
