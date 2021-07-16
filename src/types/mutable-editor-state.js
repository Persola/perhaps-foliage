// @flow
import type { MutableSynoMap } from './mutable-syno-map';
import type { MutableInverseReferenceMap } from './editor-state/mutable/mutable-inverse-reference-map';
import type { GrammarName } from './editor-state/grammar-name';
import type { Grammar } from './editor-state/grammar';
import type { MutableFocus } from './editor-state/mutable/mutable-focus';
import type { ResultSyntreeRootId } from './editor-state/result-syntree-root-id';
import type { ResultOutdated } from './editor-state/result-outdated';
import type { Interpreting } from './editor-state/interpreting';
import type { LoadingSyntree } from './editor-state/loading-syntree';

export type MutableEditorState = {|
  grammar: Grammar,
  grammarName: GrammarName,
  primitives: MutableSynoMap,
  synoMap: MutableSynoMap,
  resultTree: MutableSynoMap,
  inverseReferenceMap: MutableInverseReferenceMap,
  focus: MutableFocus,
  resultSyntreeRootId: ResultSyntreeRootId,
  resultOutdated: ResultOutdated,
  interpreting: Interpreting,
  loadingSyntree: LoadingSyntree,
|}
