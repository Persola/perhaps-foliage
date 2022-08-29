import type { MutableSynoMap } from './syntactic/mutables/mutable-syno-map';
import type { MutableInverseReferenceMap } from './editor-state/mutable/mutable-inverse-reference-map';
import type { KeyToNewSynoAttrs } from './language-integration/key-to-new-syno-attrs';
import type { ActualGrammar } from './grammar/actual-grammar';
import type { MutableFocus } from './editor-state/mutable/mutable-focus';
import type { ResultSyntreeRootId } from './editor-state/result-syntree-root-id';

export type MutableEditorState = {
  integrationId: string | null;
  actualGrammar: ActualGrammar | null;
  primitives: MutableSynoMap | null;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  synoMap: MutableSynoMap | null;
  resultTree: MutableSynoMap | null;
  inverseReferenceMap: MutableInverseReferenceMap | null;
  focus: MutableFocus | null;
  resultSyntreeRootId: ResultSyntreeRootId | null;
  interpreting: boolean;
  resultOutdated: boolean;
  loadingIntegration: boolean;
  loadingSyntree: boolean;
};
