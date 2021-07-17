// @flow
import type { Grammar } from './editor-state/grammar';
import type { KeyToNewSynoAttrs } from './language-integration/key-to-new-syno-attrs';
import type { EditorState } from './editor-state';
import type { StateSelector } from './state-selector';
import type { InterpretationResolution } from './interpreter/interpretation-resolution';

import type { Syntype } from '../extension-staging-area/saliva/types/synos/syntype';

export type LanguageIntegration = {|
  grammar: Grammar,
  keyToNewSynoAttrs: KeyToNewSynoAttrs,
  interpret: (EditorState, StateSelector) => InterpretationResolution,
  presenters: { [Syntype]: Function },
  renderers: { [Syntype]: Function },
|}
