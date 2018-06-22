// @flow
import type { SynoMap } from './editor-state/syno-map'
import type { StagedNodeId } from './editor-state/staged-node-id'
import type { ResultNodeId } from './editor-state/result-node-id'
import type { ResultOutdated } from './editor-state/result-outdated'

export type EditorState = {
  synoMap: SynoMap,
  stagedNodeId: StagedNodeId,
  resultNodeId: ResultNodeId,
  resultOutdated: ResultOutdated
}
