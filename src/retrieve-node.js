// @flow
import type { syntacticGraph } from './types/syntactic-graph.js'

// $FlowFixMe
export default (graph: syntacticGraph, path: []): syntacticGraph => {
  return path.reduce(
    (memo, currentNode) => memo[currentNode],
    graph
  );
}
