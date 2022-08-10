import type { Grammar } from '../../../grammar/grammar';
import type { KeyToNewSynoAttrs } from '../../key-to-new-syno-attrs';
import type { RendererConfig } from '../../renderers/renderer-config';

export type RendersideUninitializedPresentLangInt = {
  id: string;
  grammar: Grammar;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  renderers: Readonly<{
    [syntype: string]: RendererConfig;
  }>;
  styles: string;
};
