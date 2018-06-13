// @noflow
import resolveRef from './resolve-ref.js'
import type { syntacticGraph } from '../types/syntactic-graph' // eslint-disable-line no-unused-vars

export default (parentScope: {}, graphs: syntacticGraph[]): syntacticGraph[] => {
  return graphs.map((graph: syntacticGraph): syntacticGraph => {
    if (graph.klass === 'variableRef') {
      return resolveRef(parentScope, graph);
    } else {
      return graph;
    }
  });
}
