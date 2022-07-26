import type { KeyToNewSynoAttrs } from './key-to-new-syno-attrs';
import type { RendererCreator } from './renderer-creator';
import type { RendererAttrs } from './renderer-attrs';

export type RendersideUninitializedPresentLanguageIntegration = {
  id: string;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  rendererCreators: Readonly<{
    [syntype: string]: (RendererCreator | RendererAttrs);
  }>;
  styles: string;
};
