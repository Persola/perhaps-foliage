// @flow
import type { SynoMap } from './syno-map'
import type { FocusedSynoId } from './editor-state/focused-syno-id'
import type { ResultSyntreeRootId } from './editor-state/result-syntree-root-id'
import type { ResultOutdated } from './editor-state/result-outdated'
import type { Interpreting } from './editor-state/interpreting'

export type EditorState = {
  synoMap: SynoMap,
  focusedSynoId: FocusedSynoId,
  resultSyntreeRootId: ResultSyntreeRootId,
  resultOutdated: ResultOutdated,
  interpreting: Interpreting
}
