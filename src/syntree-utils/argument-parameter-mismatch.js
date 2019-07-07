// @flow
import type { SynoId } from '../../../types/syno-id'
import type { SynoRef } from '../../../types/syno-ref'
import type { FunctionDefinition } from '../../../types/syntactic-nodes/function-definition'
import type { Argument } from '../../../types/syntactic-nodes/argument'
import type { BooleanLiteral } from '../../../types/syntactic-nodes/boolean-literal'

export default (
  functionDefinition: FunctionDefinition,
  argumentz: Argument[],
  getSyno: Function
): string => {
  const argumentsWithSameParams = argumentz.filter((arg: Argument) => {
    return argumentz.filter(otherArg => arg.parameter.id === otherArg.parameter.id).length > 1;
  });
  if (argumentsWithSameParams.length > 0) {
    return (
      `failed to interpret '${functionDefinition.name}' (ID ${functionDefinition.id}): ` +
      `arguments (IDs ${argumentsWithSameParams.map(arg => arg.id).join(', ')}) ` +
      'refer to same parameter(s) ' +
      `(ID(s) ${[...new Set(argumentsWithSameParams.map(arg => arg.parameter.id))].join(', ')})`
    );
  }

  const unsatisfiedParamRefs = functionDefinition.parameters.filter((paramRef: SynoRef) => {
    return !argumentz.map(arg => arg.parameter.id).includes(paramRef.id);
  });
  const extraArgs = argumentz.filter((arg: Argument) => {
    return !functionDefinition.parameters.map(paramRef => paramRef.id).includes(arg.parameter.id);
  });

  const unsatisfiedParamNames = unsatisfiedParamRefs.map((paramRef: SynoRef) => {
    return getSyno(paramRef).name;
  });

  if ((unsatisfiedParamRefs.length !== 0) || (extraArgs.length !== 0)) {
    let errorMessage = (
      `failed to interpret '${functionDefinition.name}' (ID ${functionDefinition.id}): ` +
      "arguments don't match callee parameters "
    );
    if (unsatisfiedParamNames.length !== 0) {
      errorMessage += `(unsatisfied parameters ${unsatisfiedParamNames.join(', ')} (IDs ${unsatisfiedParamRefs.map(argRef => argRef.id).join(', ')})) `;
    }
    if (extraArgs.length !== 0) {
      errorMessage += `(extra arguments (IDs ${extraArgs.map(arg => arg.id).join(', ')}))`;
    }
    return (errorMessage);
  }

  return false
};
