import type { Grammar } from '../editor-state/grammar';
import type { SynoMap } from '../syntactic/syno-map';
import type { KeyToNewSynoAttrs } from './key-to-new-syno-attrs';
import type { Renderers } from './renderers';

export type RendersidePresentLanguageIntegration = {
  id: string;
  grammar: Grammar;
  primitives: SynoMap | null;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  renderers: Renderers;
  styles: string;
};
