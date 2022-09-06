import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';

import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/syno';

import type { FunctionDefinition } from '../types/synos/function-definition';
import type { Argument } from '../types/synos/argument';

const paramOf = (
  arg: Syno,
  state: StateSelector,
) => {
  if ('parameter' in arg.intertreeRefs) {
    return state.getSynoByUri(arg.intertreeRefs.parameter);
  }

  if ('parameter' in arg.intratreeRefs) {
    return arg.tree.getSyno(arg.intratreeRefs.parameter);
  }

  return null;
};

export default (
  functionDefinition: FunctionDefinition,
  argumentz: ReadonlyArray<Argument>,
  state: StateSelector,
): false | string => {
  return false;
  // // eslint-disable-line function-paren-newline
  // const argsWithoutParams = argumentz.filter(arg => paramOf(arg, state) === null);

  // if (argsWithoutParams.length > 0) {
  //   return (
  //     `failed to interpret '${functionDefinition.name}' (ID ${functionDefinition.id}): `
  //  + `arguments (IDs ${argsWithoutParams.map(arg => arg.id).join(', ')}) `
  //  + 'lack parameters'
  //   );
  // }

  // const argumentsWithSameParams = argumentz.filter((arg: Argument) => {
  //   argumentz.filter(otherArg => arg.parameter.id === otherArg.parameter.id).length > 1,
  // });

  // if (argumentsWithSameParams.length > 0) {
  //   return (
  //     `failed to interpret '${functionDefinition.name}' (ID ${functionDefinition.id}): `
  //  + `arguments (IDs ${argumentsWithSameParams
  //    .map(arg => arg.id)
  //    .join(', ')}) `
  //  + 'refer to same parameter(s) '
  //  + `(ID(s) ${[
  //    ...new Set(argumentsWithSameParams.map(arg => arg.parameter.id)),
  //  ].join(', ')})`
  //   );
  // }

  // const paramIdsRefdByArgs = argumentz
  //   .map(arg => arg.parameter)
  //   .filter(x => x)
  //   .map(paramAttrs => paramAttrs.id);
  // const unsatisfiedParamRefs = functionDefinition.parameters.filter(
  //   (paramRef: SynoRef) => !paramIdsRefdByArgs.includes(paramRef.id),
  // );
  // const extraArgs = argumentz.filter(
  //   (arg: Argument) => !functionDefinition.parameters
  //     .map(paramRef => paramRef.id)
  //     .includes(arg.parameter && arg.parameter.id),
  // );
  // const unsatisfiedParamNames = unsatisfiedParamRefs.map(paramRef => {
  //   const param = state.getSyno(paramRef.id);
  //   if (param.syntype !== 'functionParameter') throw new Error();
  //   return param.name;
  // });

  // if (unsatisfiedParamRefs.length !== 0 || extraArgs.length !== 0) {
  //   let errorMessage = (
  //     `Failed to interpret function '${functionDefinition.name}' (ID ${functionDefinition.id}):`
  //     + " arguments don't match parameters"
  //   );

  //   if (unsatisfiedParamNames.length !== 0) {
  //     errorMessage += '\n  unsatisfied parameters: ';
  //     unsatisfiedParamRefs.forEach(unsatisfiedParamRef => {
  //       const param = state.getSyno(unsatisfiedParamRef.id);
  //       errorMessage += `'${param.name}' (ID '${unsatisfiedParamRef.id}'), `;
  //     });
  //   }

  //   if (extraArgs.length !== 0) {
  //     errorMessage += `\n  extra arguments IDs: ${
  //       extraArgs.map(arg => `'${arg.id}'`).join(', ')
  //     })`;
  //   }

  //   return errorMessage;
  // }

  // return false;
};
