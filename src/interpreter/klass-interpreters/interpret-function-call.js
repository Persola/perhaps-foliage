// @noflow
import retrieveNodeFromGraphCollection from '../retrieve-node-from-graph-collection.js'
import resolveArguments from '../resolve-arguments.js'
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
  parentScope: {},
  graphToInterpret: functionCall,
  graphCollection: syntacticGraphMap
): interpretationResolution => {
  // allow argumentz to be variableRef, resolve them using scope passed in
  const ownScope = {};

  let argumentz: functionArgument[] = graphToInterpret.argumentz;
  let resolvedArguments;
  if (graphToInterpret.nor) {
    (resolvedArguments: booleanLiteral[]) = resolveArguments(parentScope, argumentz); // eslint-disable-line no-unused-vars
  } else {
    (resolvedArguments: functionArgument[]) = resolveArguments(parentScope, argumentz); // eslint-disable-line no-unused-vars
  }

  if (graphToInterpret.nor) {
    return NOR_Primitive(resolvedArguments);
  } else {
    let functionDefNode: syntacticGraph; // eslint-disable-line no-unused-vars
    try {
      functionDefNode = retrieveNodeFromGraphCollection(graphCollection, graphToInterpret.callee);
    }
    catch (error) {
      return {
        success: false,
        error: {message: `interpret-function could not retrieve node: ${error.message}`}
      }
    }

    if (functionDefNode.klass !== 'functionDefinition') {
      throw new Error(`invalid function ref (returned syno of wrong klass)`);
    }

    const functionDefParameters = functionDefNode.parameterz;
    functionDefParameters.forEach((param, ind) => {
      ownScope[param.name] = resolvedArguments[ind];
    });

    const functionResolution = interpreter(
      functionDefNode.body,
      graphCollection,
      ownScope
    );

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
