import type { ActualGrammar } from '../../../grammar/actual-grammar';
import type { KeyToNewSynoAttrs } from '../../key-to-new-syno-attrs';
import type { RendererConfig } from '../../renderers/renderer-config';

export type RendersideUninitializedPresentLangInt = {
  id: string;
  actualGrammar: ActualGrammar;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  renderers: Readonly<{
    [syntype: string]: RendererConfig;
  }>;
  styles: string;
};
