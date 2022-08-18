import type { Grammar } from '../../../grammar/grammar';
import type { KeyToNewSynoAttrs } from '../../key-to-new-syno-attrs';
import type { Renderers } from '../../../renderer/renderers';

export type RendersidePresentLangInt = {
  id: string;
  grammar: Grammar;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  renderers: Renderers;
  styles: string;
};
