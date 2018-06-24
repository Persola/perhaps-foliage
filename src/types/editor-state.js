// @flow
import type { SynoMap } from './editor-state/syno-map'
import type { FocusedSynoId } from './editor-state/focused-syno-id'
import type { ResultSyntreeRootId } from './editor-state/result-syntree-root-id'
import type { ResultOutdated } from './editor-state/result-outdated'

export type EditorState = {
  synoMap: SynoMap,
  focusedSynoId: FocusedSynoId,
  resultSyntreeRootId: ResultSyntreeRootId,
  resultOutdated: ResultOutdated
}
