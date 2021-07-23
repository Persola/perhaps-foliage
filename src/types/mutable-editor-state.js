// @flow
import type { MutableSynoMap } from './mutable-syno-map';
import type { InverseReferenceMap } from './editor-state/inverse-reference-map';
import type { KeyToNewSynoAttrs } from './language-integration/key-to-new-syno-attrs';
import type { Grammar } from './editor-state/grammar';
import type { MutableFocus } from './editor-state/mutable/mutable-focus';
import type { ResultSyntreeRootId } from './editor-state/result-syntree-root-id';

export type MutableEditorState = {|
  integrationId: ?string,
  grammar: ?Grammar,
  primitives: ?MutableSynoMap,
  keyToNewSynoAttrs: KeyToNewSynoAttrs,
  lastIntegrationBindings: ?string[],
  synoMap: ?MutableSynoMap,
  resultTree: ?MutableSynoMap,
  inverseReferenceMap: ?InverseReferenceMap,
  focus: ?MutableFocus,
  resultSyntreeRootId: ?ResultSyntreeRootId,
  interpreting: boolean,
  resultOutdated: boolean,
  loadingIntegration: boolean,
  loadingSyntree: boolean,
|}
