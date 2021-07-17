// @flow
import type { EditorState } from './editor-state';

import type { Grammar } from './editor-state/grammar';
import type { GrammarName } from './editor-state/grammar-name';
import type { SynoMap } from './syno-map';
import type { InverseReferenceMap } from './editor-state/inverse-reference-map';
import type { Focus } from './editor-state/focus';
import type { ResultSyntreeRootId } from './editor-state/result-syntree-root-id';
import type { Interpreting } from './editor-state/interpreting';
import type { ResultOutdated } from './editor-state/result-outdated';
import type { LoadingSyntree } from './editor-state/loading-syntree';

import type { Syno } from './syno';
import type { SynoId } from './syno-id';
import type { SalivaSelectors } from '../extension-staging-area/saliva/types/selectors';

type BaseStateSelector = {
  // state
  state: EditorState,
  // first-level accessors
  grammar: () => Grammar,
  grammarName: () => GrammarName,
  primitives: () => SynoMap,
  synoMap: () => SynoMap,
  inverseReferenceMap: () => InverseReferenceMap,
  focus: () => Focus,
  resultSyntreeRootId: () => ResultSyntreeRootId,
  interpreting: () => Interpreting,
  resultOutdated: () => ResultOutdated,
  // deeper accessors
  loadingSyntree: () => LoadingSyntree,
  focusedSynoId: () => SynoId,
  focusedPresnoIndex: () => number,
  focusedCharIndex: () => number,
  // synos
  getSyno: (synoId: SynoId) => Syno,
  focusedSyno: () => Syno,
  isPrimitive: SynoId => boolean,
  // focus
  inPresno: () => boolean,
  inText: () => boolean,
  focusedSynoIsRoot: () => boolean,
}

export type StateSelector = BaseStateSelector & SalivaSelectors
