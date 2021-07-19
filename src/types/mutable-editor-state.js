// @flow
import type { MutableSynoMap } from './mutable-syno-map';
import type { InverseReferenceMap } from './editor-state/inverse-reference-map';
import type { KeyToNewSynoAttrs } from './language-integration/key-to-new-syno-attrs';
import type { Grammar } from './editor-state/grammar';
import type { MutableFocus } from './editor-state/mutable/mutable-focus';
import type { ResultSyntreeRootId } from './editor-state/result-syntree-root-id';
import type { ResultOutdated } from './editor-state/result-outdated';
import type { Interpreting } from './editor-state/interpreting';
import type { LoadingSyntree } from './editor-state/loading-syntree';

export type MutableEditorState = {|
  integrationId: (false | string),
  grammar: (false | Grammar),
  primitives: (false | MutableSynoMap),
  keyToNewSynoAttrs: KeyToNewSynoAttrs,
  lastIntegrationBindings: (false | string[]),
  synoMap: (false | MutableSynoMap),
  resultTree: (false | MutableSynoMap),
  inverseReferenceMap: (false | InverseReferenceMap),
  focus: (false | MutableFocus),
  resultSyntreeRootId: (false | ResultSyntreeRootId),
  interpreting: (false | Interpreting),
  resultOutdated: (false | ResultOutdated),
  loadingIntegration: boolean,
  loadingSyntree: (false | LoadingSyntree),
|}
