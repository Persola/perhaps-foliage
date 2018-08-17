// @flow
import type { SynoMap } from './syno-map'
import type { Focus } from './editor-state/focus'
import type { ResultSyntreeRootId } from './editor-state/result-syntree-root-id'
import type { ResultOutdated } from './editor-state/result-outdated'
import type { Interpreting } from './editor-state/interpreting'

export type EditorState = {
  synoMap: SynoMap,
  focus: Focus,
  resultSyntreeRootId: ResultSyntreeRootId,
  resultOutdated: ResultOutdated,
  interpreting: Interpreting
}
