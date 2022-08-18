import type { ActualGrammar } from '../../../grammar/actual-grammar';
import type { KeyToNewSynoAttrs } from '../../key-to-new-syno-attrs';
import type { Renderers } from '../../../renderer/renderers';

export type RendersidePresentLangInt = {
  id: string;
  actualGrammar: ActualGrammar;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  renderers: Renderers;
  styles: string;
};
