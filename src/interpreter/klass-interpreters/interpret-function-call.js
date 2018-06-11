// @flow
import retrieveNodeFromGraphCollection from '../retrieve-node-from-graph-collection.js'
import NOR_Primitive from './NOR-primitive.js'
import isBoolean from './is-boolean.js'
import type { interpretationResolution } from '../../types/interpreter/interpretation-resolution' // eslint-disable-line no-unused-vars
import type { syntacticGraphMap } from '../../types/syntactic-graph-map' // eslint-disable-line no-unused-vars
import type { syntacticGraph } from '../../types/syntactic-graph' // eslint-disable-line no-unused-vars
import type { functionCall } from '../../types/syntactic-nodes/function-call' // eslint-disable-line no-unused-vars
import type { booleanLiteral } from '../../types/syntactic-nodes/boolean-literal' // eslint-disable-line no-unused-vars
import type { graphId } from '../../types/graph-id' // eslint-disable-line no-unused-vars

const interpretFunction = (
  graphToInterpret: functionCall,
  graphCollection: syntacticGraphMap
): interpretationResolution => {
  const {
    argumentz,
    functionRef
  } = graphToInterpret;
  if (functionRef === 'NOR') {
    if (argumentz.length !== 2) {
      return {
        success: false,
        error: {message: `NOR recieved wrong number of arguments (${typeof argumentz.length} "${argumentz.length}" instead of 2)`}
      }
    }

    if (
      (!isBoolean(argumentz[0])) ||
      (!isBoolean(argumentz[1]))
    ) {
      const badArg = !isBoolean(argumentz[0]) ? isBoolean(argumentz[0]) : isBoolean(argumentz[1])
      return {
        success: false,
        error: {message: `NOR recieved non-boolean argument '${String(badArg)}' (${typeof badArg})`}
      }
    }

    return {
      success: true,
      result: NOR_Primitive(argumentz[0], argumentz[1])
    }
  } else {
    let functionNode; // eslint-disable-line no-unused-vars
    try {
      functionNode = retrieveNodeFromGraphCollection(graphCollection, functionRef);
    }
    catch (error) {
      return {
        success: false,
        error: {message: `interpret-function could not retrieve node: ${error.message}`}
      }
    }

    // todo: recurse on functionNode
    const universalNonPrimitiveFunctionResult: booleanLiteral = {
      klass: 'booleanLiteral',
      value: true
    };

    // if (functionResolution.success === false) {
    //   return {
    //     success: false,
    //     error: {message: functionResolution.error.message}
    //   };
    // }

    return {
      success: true,
      result: universalNonPrimitiveFunctionResult
    };
  }
}

export default interpretFunction
