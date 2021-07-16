// @flow
import type { SynoMap } from './syno-map';
import type { InverseReferenceMap } from './editor-state/inverse-reference-map';
import type { GrammarName } from './editor-state/grammar-name';
import type { Grammar } from './editor-state/grammar';
import type { Focus } from './editor-state/focus';
import type { ResultSyntreeRootId } from './editor-state/result-syntree-root-id';
import type { ResultOutdated } from './editor-state/result-outdated';
import type { Interpreting } from './editor-state/interpreting';
import type { LoadingSyntree } from './editor-state/loading-syntree';

export type EditorState = {|
  +grammar: Grammar,
  +grammarName: GrammarName,
  +primitives: SynoMap,
  +synoMap: SynoMap,
  +resultTree: SynoMap,
  +inverseReferenceMap: InverseReferenceMap,
  +focus: Focus,
  +resultSyntreeRootId: ResultSyntreeRootId,
  +interpreting: Interpreting,
  +resultOutdated: ResultOutdated,
  +loadingSyntree: LoadingSyntree,
|}
