// @flow
import type { Grammar } from './editor-state/grammar';
import type { KeyToNewSynoAttrs } from './language-integration/key-to-new-syno-attrs';

export type LanguageIntegration = {|
  grammar: Grammar,
  keyToNewSynoAttrs: KeyToNewSynoAttrs,
|}
