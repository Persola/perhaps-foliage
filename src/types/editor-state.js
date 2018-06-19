// @flow
import type { synoMap } from './editor-state/syno-map'
import type { stagedNodeId } from './editor-state/staged-node-id'
import type { resultNodeId } from './editor-state/result-node-id'
import type { resultOutdated } from './editor-state/result-outdated'

export type editorState = {
  graphs: synoMap,
  stagedNodeId: stagedNodeId,
  resultNodeId: resultNodeId,
  resultOutdated: resultOutdated
}
