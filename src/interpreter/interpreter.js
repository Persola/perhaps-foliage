// @flow
import retrieveNode from '../retrieve-node.js'
import resolveFunction from './resolve-function.js'
import type { interpretationResolution } from '../types/interpreter/interpretation-resolution' // eslint-disable-line no-unused-vars
import type { syntacticGraph } from '../types/syntactic-graph' // eslint-disable-line no-unused-vars
import type { syntacticGraphMap } from '../types/syntactic-graph-map' // eslint-disable-line no-unused-vars
import type { graphId } from '../types/graph-id' // eslint-disable-line no-unused-vars

export default (
  graphToInterpret: syntacticGraph,
  graphCollection: syntacticGraphMap
): interpretationResolution => {
  switch (graphToInterpret.klass) {
    case 'booleanLiteral':
      return {
        success: true,
        result: graphToInterpret
      };
    case 'functionCall': // eslint-disable-line
      const {
        argumentz,
        functionRef: {
          graphId: refGraphId,
          nodePath: refNodePath
        }
      } = graphToInterpret;
      const availableGraphsIds: graphId[] = Object.keys(graphCollection);

      if (!availableGraphsIds.includes(refGraphId)) {
        throw new Error(
          'invalid function reference (host graph not found)'
        );
      }

      const functionNode = retrieveNode(graphCollection[refGraphId], refNodePath);

      if (functionNode === false) {
        throw new Error('invalid function reference (path invalid within graph)');
      }

      const functionResolution = resolveFunction(functionNode, argumentz);

      if (functionResolution.error === true) {
        return {
          success: false,
          error: {
            message: `Function ${String(functionNode)} errored with arguments: ${String(argumentz)} `
          }
        };
      }

      return {
        success: true,
        result: functionResolution
      };
    default:
      throw new Error('unrecognized type');
  }
}
