// @flow
import type { SynoMap } from './syno-map'
import type { InverseReferenceMap } from './editor-state/inverse-reference-map'
import type { GrammarName } from './editor-state/grammar-name'
import type { Grammar } from './editor-state/grammar'
import type { SynoId } from './syno-id'
import type { Focus } from './editor-state/focus'
import type { ResultSyntreeRootId } from './editor-state/result-syntree-root-id'
import type { ResultOutdated } from './editor-state/result-outdated'
import type { Interpreting } from './editor-state/interpreting'
import type { TextHostRefs } from './editor-state/text-host-refs'

import type { Syntype } from '../extension-staging-area/saliva/types/synos/syntype'

export type EditorState = {
  synoMap: SynoMap,
  inverseReferenceMap: InverseReferenceMap,
  grammarName: GrammarName,
  grammar: Grammar,
  textHostRefs: TextHostRefs,
  focus: Focus,
  resultSyntreeRootId: ResultSyntreeRootId,
  resultOutdated: ResultOutdated,
  interpreting: Interpreting
}
