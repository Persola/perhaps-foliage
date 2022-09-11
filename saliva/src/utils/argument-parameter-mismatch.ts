import StateSelector from 'perhaps-foliage/dist/main-process/selectors/state-selector';

import type { FunctionDefinition } from '../types/synos/function-definition';
import type { Argument } from '../types/synos/argument';
import { FunctionParameter } from '../types/synos/function-parameter';

const paramRefOf = (
  arg: Argument,
) => {
  if ('parameter' in arg.intertreeRefs) {
    return arg.intertreeRefs.parameter;
  }

  if ('parameter' in arg.intratreeRefs) {
    return arg.intratreeRefs.parameter;
  }

  return null;
};

const paramOf = (
  arg: Argument,
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
  const argsWithoutParams = argumentz.filter(arg => paramRefOf(arg) === null);

  if (argsWithoutParams.length > 0) {
    return (
      `arguments (IDs ${argsWithoutParams.map(arg => `'${arg.id}'`).join(', ')}) lack parameters`
    );
  }

  // const argumentsWithWrongFunctionParams = argumentz.filter((arg: Argument) => {
  //   return argumentz.filter(
  //     otherArg => arg.parent() paramOf(arg).parent,
  //   ).length > 1;
  // });

  // if (argumentsWithSameParams.length > 0) {
  //   return (
  //     `arguments (IDs ${argumentsWithSameParams.map(arg => arg.id).join(', ')})`
  //     + ' refer to same parameter(s) '
  //     + `(ID(s) ${[
  //       ...new Set(argumentsWithSameParams.map(arg => paramOf(arg, state).id)),
  //     ].join(', ')})`
  //   );
  // }

  const argumentsWithSameParams = argumentz.filter((arg: Argument) => {
    return argumentz.filter(
      otherArg => paramRefOf(arg) === paramRefOf(otherArg),
    ).length > 1;
  });

  if (argumentsWithSameParams.length > 0) {
    return (
      `arguments (IDs ${argumentsWithSameParams.map(arg => arg.id).join(', ')})`
      + ' refer to same parameter(s) '
      + `(ID(s) ${[
        ...new Set(argumentsWithSameParams.map(arg => paramOf(arg, state).id)),
      ].join(', ')})`
    );
  }

  const paramIdsRefdByArgs = argumentz.map(arg => paramOf(arg, state).id);

  const unsatisfiedParamRefs = (
    functionDefinition.children({ label: 'parameter' }) as unknown[] as FunctionParameter[]
  ).filter(
    (param: FunctionParameter) => !paramIdsRefdByArgs.includes(param.id),
  );

  const extraArgs = argumentz.filter(
    (arg: Argument) => !functionDefinition.children({ label: 'parameter' })
      .map(param => param.id)
      .includes(arg.parameter && arg.parameter.id),
  );

  const unsatisfiedParamNames = unsatisfiedParamRefs.map(paramRef => {
    const param = state.getSyno(paramRef.id);
    if (param.syntype !== 'functionParameter') throw new Error();
    return param.name;
  });

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
