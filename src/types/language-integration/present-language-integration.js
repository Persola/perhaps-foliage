// @flow
import type { Grammar } from '../editor-state/grammar';
import type { SynoMap } from '../syno-map';
import type { KeyToNewSynoAttrs } from './key-to-new-syno-attrs';
import type { EditorStateWithIntegration } from '../editor-state/editor-state-with-integration';
import type { StateSelector } from '../state-selector';
import type { InterpretationResolution } from '../interpreter/interpretation-resolution';

import type { Syntype } from '../../extension-staging-area/saliva/types/synos/syntype';

export type PresentLanguageIntegration = {|
  id: string,
  grammar: Grammar,
  primitives: SynoMap,
  keyToNewSynoAttrs: KeyToNewSynoAttrs,
  interpret: (EditorStateWithIntegration, StateSelector) => InterpretationResolution,
  presenters: { [Syntype]: Function },
  renderers: { [Syntype]: Function },
  styles: {
    use: () => void,
    unuse: () => void,
  },
|}
