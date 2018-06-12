// @flow
import retrieveNodeFromGraphCollection from '../retrieve-node-from-graph-collection.js'
import NOR_Primitive from './NOR-primitive.js'
import type { interpretationResolution } from '../../types/interpreter/interpretation-resolution' // eslint-disable-line no-unused-vars
import type { syntacticGraphMap } from '../../types/syntactic-graph-map' // eslint-disable-line no-unused-vars
import type { syntacticGraph } from '../../types/syntactic-graph' // eslint-disable-line no-unused-vars
import type { functionCall } from '../../types/syntactic-nodes/function-call' // eslint-disable-line no-unused-vars
import type { functionArgument } from '../../types/syntactic-nodes/function-call/function-argument' // eslint-disable-line no-unused-vars
import type { functionDefinition } from '../../types/syntactic-nodes/function-definition' // eslint-disable-line no-unused-vars
import type { booleanLiteral } from '../../types/syntactic-nodes/boolean-literal' // eslint-disable-line no-unused-vars
import type { graphId } from '../../types/graph-id' // eslint-disable-line no-unused-vars

const interpretFunction = (
  interpreter: Function,
  graphToInterpret: functionCall,
  graphCollection: syntacticGraphMap
): interpretationResolution => {
  if (graphToInterpret.nor) {
    const argumentz: booleanLiteral[] = graphToInterpret.argumentz;
    return NOR_Primitive(argumentz);
  } else {
    // const argumentz: functionArgument[] = graphToInterpret.argumentz;
    let functionDefNode: functionDefinition; // eslint-disable-line no-unused-vars
    try {
      functionDefNode = retrieveNodeFromGraphCollection(graphCollection, graphToInterpret.functionRef);
    }
    catch (error) {
      return {
        success: false,
        error: {message: `interpret-function could not retrieve node: ${error.message}`}
      }
    }

    const functionResolution = interpreter(functionDefNode.body, graphCollection);
    // const universalNonPrimitiveFunctionResult: booleanLiteral = {
    //   klass: 'booleanLiteral',
    //   value: true
    // };

    // if (functionResolution.success === false) {
    //   return {
    //     success: false,
    //     error: {message: functionResolution.error.message}
    //   };
    // }

    if (functionResolution.success) {
      return {
        success: true,
        result: functionResolution.result
      };
    } else {
      return {
        success: false,
        error: {message: 'function failed'}
      };
    }
  }
}

export default interpretFunction
