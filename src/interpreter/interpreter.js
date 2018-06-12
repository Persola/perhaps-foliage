// @flow
import interpretFunctionCall from './klass-interpreters/interpret-function-call.js'
import type { interpretationResolution } from '../types/interpreter/interpretation-resolution' // eslint-disable-line no-unused-vars
import type { syntacticGraph } from '../types/syntactic-graph' // eslint-disable-line no-unused-vars
import type { syntacticGraphMap } from '../types/syntactic-graph-map' // eslint-disable-line no-unused-vars
import type { graphId } from '../types/graph-id' // eslint-disable-line no-unused-vars

const interpreter = (
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
      return interpretFunctionCall(interpreter, graphToInterpret, graphCollection);
    default:
      throw new Error('invalid syntactic node (unrecognized type)');
  }
}

export default interpreter
