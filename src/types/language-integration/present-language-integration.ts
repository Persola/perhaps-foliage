import type { Grammar } from '../editor-state/grammar';
import type { SynoMap } from '../syntactic/syno-map';
import type { KeyToNewSynoAttrs } from './key-to-new-syno-attrs';
import type { Interpret } from './interpret';
import type { Presenters } from './presenters';
import type { Renderers } from './renderers';

export type PresentLanguageIntegration = {
  id: string;
  grammar: Grammar;
  primitives: SynoMap | null;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  interpret: Interpret | null;
  presenters: Presenters;
  renderers: Renderers;
  styles: {
    use: () => void;
    unuse: () => void;
  };
};
