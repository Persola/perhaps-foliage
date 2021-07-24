import type { EditorState } from './editor-state';
import type { Grammar } from './editor-state/grammar';
import type { SynoMap } from './syntactic/syno-map';
import type { KeyToNewSynoAttrs } from './language-integration/key-to-new-syno-attrs';
import type { InverseReferenceMap } from './editor-state/inverse-reference-map';
import type { Focus } from './editor-state/focus';
import type { ResultSyntreeRootId } from './editor-state/result-syntree-root-id';
import type { Syno } from './syntactic/syno';
import type { SynoId } from './syntactic/syno-id';

export type StateSelector = {
  // state
  state: EditorState;
  // first-level accessors
  integrationId: () => string;
  grammar: () => Grammar;
  primitives: () => SynoMap;
  keyToNewSynoAttrs: () => KeyToNewSynoAttrs;
  lastIntegrationBindings: () => string[];
  synoMap: () => SynoMap;
  resultTree: () => SynoMap;
  inverseReferenceMap: () => InverseReferenceMap;
  focus: () => Focus;
  resultSyntreeRootId: () => ResultSyntreeRootId;
  interpreting: () => boolean;
  resultOutdated: () => boolean;
  loadingIntegration: () => boolean;
  loadingSyntree: () => boolean;
  // deeper accessors
  focusedSynoId: () => SynoId;
  focusedPresnoIndex: () => number;
  focusedCharIndex: () => number;
  // loaded
  treeLoaded: () => boolean;
  integrationLoaded: () => boolean;
  // synos
  getSyno: (synoId: SynoId) => Syno;
  focusedSyno: () => Syno;
  isPrimitive: (synoId: SynoId) => boolean;
  // focus
  inPresno: () => boolean;
  inText: () => boolean;
  focusedSynoIsRoot: () => boolean;
};
