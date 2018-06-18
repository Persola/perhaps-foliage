// @noflow
import descendToNode from './descend-to-node.js'

import type { syntacticGraphMap } from './types/syntactic-graph-map.js'
import type { syno } from './types/syno.js'
import type { graphId } from './types/graph-id.js'
import type { synoRef } from './types/syno-ref.js'

export default (
  graphCollection: syntacticGraphMap,
  targetSynoRef: synoRef,
): syno => {
  const { graphId: refGraphId, nodePath: refNodePath } = targetSynoRef;
  const collectionGraphsIds: graphId[] = Object.keys(graphCollection);
  if (!collectionGraphsIds.includes(refGraphId)) {
    throw new Error(
      'invalid node reference (ancestor graph not found)'
    );
  }
  const node = descendToNode(graphCollection[refGraphId], refNodePath);
  if (node === false) {
    throw new Error('invalid node reference (path invalid within graph)');
  }
  return node;
}
