import type { MutableSynoMap } from './mutable-syno-map';
import type { InverseReferenceMap } from './editor-state/inverse-reference-map';
import type { KeyToNewSynoAttrs } from './language-integration/key-to-new-syno-attrs';
import type { Grammar } from './editor-state/grammar';
import type { MutableFocus } from './editor-state/mutable/mutable-focus';
import type { ResultSyntreeRootId } from './editor-state/result-syntree-root-id';

export type MutableEditorState = {
  integrationId: string | null | undefined;
  grammar: Grammar | null | undefined;
  primitives: MutableSynoMap | null | undefined;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  lastIntegrationBindings: string[] | null | undefined;
  synoMap: MutableSynoMap | null | undefined;
  resultTree: MutableSynoMap | null | undefined;
  inverseReferenceMap: InverseReferenceMap | null | undefined;
  focus: MutableFocus | null | undefined;
  resultSyntreeRootId: ResultSyntreeRootId | null | undefined;
  interpreting: boolean;
  resultOutdated: boolean;
  loadingIntegration: boolean;
  loadingSyntree: boolean;
};
