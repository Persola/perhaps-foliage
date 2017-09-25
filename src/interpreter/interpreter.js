// @flow
import type { syntacticGraph } from '../types/syntactic-graph' // eslint-disable-line no-unused-vars

export default (syntacticGraph: syntacticGraph): (syntacticGraph | void) => {
  let result;
  switch (syntacticGraph.klass) {
    case 'booleanLiteral':
      result = syntacticGraph;
      break;
    case 'functionCall': // eslint-disable-line
      const availableFunctionNames = [];
      if (availableFunctionNames.includes(syntacticGraph.functionRef)) {
        throw new Error('match should be impossible');
      } else {
        throw new Error('syntactic graph is incomplete');
      }
    // break;
  }

  return result;
}
