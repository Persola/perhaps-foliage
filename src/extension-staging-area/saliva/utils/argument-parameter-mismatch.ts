// @flow
import type { StateSelector } from '../../../types/state-selector';
import type { SynoRef } from '../../../types/syno-ref';
import type { FunctionDefinition } from '../types/synos/function-definition';
import type { Argument } from '../types/synos/argument';

export default (
  functionDefinition: FunctionDefinition,
  argumentz: $ReadOnlyArray<Argument>,
  state: StateSelector,
): (false | string) => { // eslint-disable-line function-paren-newline
  const argsWithoutParams = argumentz.filter(arg => !arg.parameter);
  if (argsWithoutParams.length > 0) {
    return (
      `failed to interpret '${functionDefinition.name}' (ID ${functionDefinition.id}): `
      + `arguments (IDs ${argsWithoutParams.map(arg => arg.id).join(', ')}) `
      + 'lack parameters'
    );
  }

  const argumentsWithSameParams = argumentz.filter((arg: Argument) => (
    // $FlowIssue: poorly typed ECMA built-in (filter) (or array length logic?)
    argumentz.filter(otherArg => arg.parameter.id === otherArg.parameter.id).length > 1
  ));
  if (argumentsWithSameParams.length > 0) {
    return (
      `failed to interpret '${functionDefinition.name}' (ID ${functionDefinition.id}): `
      + `arguments (IDs ${argumentsWithSameParams.map(arg => arg.id).join(', ')}) `
      + 'refer to same parameter(s) '
      // $FlowIssue: poorly typed ECMA built-in (filter) (or array length logic?)
      + `(ID(s) ${[...new Set(argumentsWithSameParams.map(arg => arg.parameter.id))].join(', ')})`
    );
  }

  const paramIdsRefdByArgs = argumentz
    .map(arg => arg.parameter)
    .filter(x => x)
    // $FlowIssue: poorly typed ECMA built-in (filter) (or array length logic?)
    .map(paramAttrs => paramAttrs.id);
  const unsatisfiedParamRefs = functionDefinition.parameters.filter((paramRef: SynoRef) => (
    !paramIdsRefdByArgs.includes(paramRef.id)
  ));
  const extraArgs = argumentz.filter((arg: Argument) => !functionDefinition.parameters
    .map(paramRef => paramRef.id)
    .includes(arg.parameter && arg.parameter.id));

  const unsatisfiedParamNames = (
    unsatisfiedParamRefs.map(paramRef => {
      const param = state.getSyno(paramRef.id);
      if (param.syntype !== 'functionParameter') throw new Error();
      return param.name;
    })
  );

  if ((unsatisfiedParamRefs.length !== 0) || (extraArgs.length !== 0)) {
    let errorMessage = (
      `failed to interpret '${functionDefinition.name}' (ID ${functionDefinition.id}): `
      + "arguments don't match callee parameters "
    );
    if (unsatisfiedParamNames.length !== 0) {
      errorMessage += `(unsatisfied parameters ${unsatisfiedParamNames.join(', ')}`;
      errorMessage += `(IDs ${unsatisfiedParamRefs.map(argRef => argRef.id).join(', ')}))`;
    }
    if (extraArgs.length !== 0) {
      errorMessage += `(extra arguments (IDs ${extraArgs.map(arg => arg.id).join(', ')}))`;
    }
    return (errorMessage);
  }

  return false;
};
