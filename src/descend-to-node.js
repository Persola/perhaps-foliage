// @flow
import type { syntacticGraph } from './types/syntactic-graph.js'
import type { synoId } from './types/syno-id.js'

// $FlowFixMe
export default (
  graph: syntacticGraph,
  nodePath: synoId[]
): syntacticGraph | false => {
  let currentNode = graph;
  for(let i = 0; i < nodePath.length; i++) {
    if (currentNode === undefined) { return false }
    currentNode = currentNode[nodePath[i]];
  }

  return currentNode;
}
