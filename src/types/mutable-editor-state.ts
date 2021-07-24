import type { MutableSynoMap } from './syntactic/mutables/mutable-syno-map';
import type { InverseReferenceMap } from './editor-state/inverse-reference-map';
import type { KeyToNewSynoAttrs } from './language-integration/key-to-new-syno-attrs';
import type { Grammar } from './editor-state/grammar';
import type { MutableFocus } from './editor-state/mutable/mutable-focus';
import type { ResultSyntreeRootId } from './editor-state/result-syntree-root-id';

export type MutableEditorState = {
  integrationId: string | null;
  grammar: Grammar | null;
  primitives: MutableSynoMap | null;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  lastIntegrationBindings: string[] | null;
  synoMap: MutableSynoMap | null;
  resultTree: MutableSynoMap | null;
  inverseReferenceMap: InverseReferenceMap | null;
  focus: MutableFocus | null;
  resultSyntreeRootId: ResultSyntreeRootId | null;
  interpreting: boolean;
  resultOutdated: boolean;
  loadingIntegration: boolean;
  loadingSyntree: boolean;
};
