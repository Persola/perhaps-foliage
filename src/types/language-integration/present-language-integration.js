// @flow
import type { Grammar } from '../editor-state/grammar';
import type { SynoMap } from '../syno-map';
import type { KeyToNewSynoAttrs } from './key-to-new-syno-attrs';
import type { EditorStateWithIntegration } from '../editor-state/editor-state-with-integration';
import type { StateSelector } from '../state-selector';
import type { InterpretationResolution } from '../interpreter/interpretation-resolution';

export type PresentLanguageIntegration = {|
  id: string,
  grammar: Grammar,
  primitives: (false | SynoMap),
  keyToNewSynoAttrs: KeyToNewSynoAttrs,
  interpret: (
    false
    | (EditorStateWithIntegration, StateSelector) => InterpretationResolution
  ),
  presenters: { +[string]: Function },
  renderers: { +[string]: Function },
  styles: {
    use: () => void,
    unuse: () => void,
  },
|}
