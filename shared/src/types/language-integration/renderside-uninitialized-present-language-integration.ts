import type { KeyToNewSynoAttrs } from './key-to-new-syno-attrs';
import type { RendererCreator } from './renderer-creator';

export type RendersideUninitializedPresentLanguageIntegration = {
  id: string;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  rendererCreators: Readonly<{
    [syntype: string]: RendererCreator;
  }>;
  styles: string;
};
