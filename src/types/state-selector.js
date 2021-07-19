// @flow
import type { EditorState } from './editor-state';

import type { Grammar } from './editor-state/grammar';
import type { SynoMap } from './syno-map';
import type { KeyToNewSynoAttrs } from './language-integration/key-to-new-syno-attrs';
import type { InverseReferenceMap } from './editor-state/inverse-reference-map';
import type { Focus } from './editor-state/focus';
import type { ResultSyntreeRootId } from './editor-state/result-syntree-root-id';
import type { Interpreting } from './editor-state/interpreting';
import type { ResultOutdated } from './editor-state/result-outdated';
import type { LoadingSyntree } from './editor-state/loading-syntree';

import type { Syno } from './syno';
import type { SynoId } from './syno-id';

export type StateSelector = {
  // state
  state: EditorState,
  // first-level accessors
  integrationId: () => string,
  grammar: () => Grammar,
  primitives: () => SynoMap,
  keyToNewSynoAttrs: () => KeyToNewSynoAttrs,
  lastIntegrationBindings: () => string[],
  synoMap: () => SynoMap,
  resultTree: () => SynoMap,
  inverseReferenceMap: () => InverseReferenceMap,
  focus: () => Focus,
  resultSyntreeRootId: () => ResultSyntreeRootId,
  interpreting: () => Interpreting,
  resultOutdated: () => ResultOutdated,
  loadingIntegration: () => boolean,
  loadingSyntree: () => LoadingSyntree,
  // deeper accessors
  focusedSynoId: () => SynoId,
  focusedPresnoIndex: () => number,
  focusedCharIndex: () => number,
  // loaded
  treeLoaded: () => boolean,
  integrationLoaded: () => boolean,
  // synos
  getSyno: (synoId: SynoId) => Syno,
  focusedSyno: () => Syno,
  isPrimitive: SynoId => boolean,
  // focus
  inPresno: () => boolean,
  inText: () => boolean,
  focusedSynoIsRoot: () => boolean,
}
