// @flow
import type { nodeId } from './node-id'
import type { graphId } from './graph-id'

export type nodeRef = {
  graphId: graphId,
  nodePath: nodeId[]
}
