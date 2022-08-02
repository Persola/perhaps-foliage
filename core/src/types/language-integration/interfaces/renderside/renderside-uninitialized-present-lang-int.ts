import type { Grammar } from '../../../grammar/grammar';
import type { KeyToNewSynoAttrs } from '../../key-to-new-syno-attrs';
import type { RendererAttrs } from '../../renderer-attrs';

export type RendersideUninitializedPresentLangInt = {
  id: string;
  grammar: Grammar;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  rendererAttrs: Readonly<{
    [syntype: string]: RendererAttrs;
  }>;
  styles: string;
};
