import type { KeyToNewSynoAttrs } from './key-to-new-syno-attrs';
import type { Renderers } from './renderers';

export type RendersidePresentLanguageIntegration = {
  id: string;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  renderers: Renderers;
  styles: string;
};
