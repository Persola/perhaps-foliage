// @flow
import type { syno } from './types/syno.js'
import type { synoId } from './types/syno-id.js'

// $FlowFixMe
export default (
  graph: syno,
  nodePath: synoId[]
): syno | false => {
  let currentNode = graph;
  for(let i = 0; i < nodePath.length; i++) {
    if (currentNode === undefined) { return false }
    currentNode = currentNode[nodePath[i]];
  }

  return currentNode;
}
