// @flow
import type { syntacticGraphMap } from './syntactic-graph-map'
import type { graphId } from './graph-id'
import type { nodeId } from './node-id'

export type editorState = {
  graphs: syntacticGraphMap,
  stagedGraphKey: graphId,
  resultGraphKey: graphId,
  focusedNodePath: nodeId[]
}
