import StateSelector from 'perhaps-foliage/dist/main-process/selectors/state-selector';

import type { FunctionDefinition } from '../types/synos/function-definition';
import type { Argument } from '../types/synos/argument';
import type { FunctionParameter } from '../types/synos/function-parameter';
import type { FunctionCall } from '../types/synos/function-call';

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
    return arg.followIntratreeRef('parameter');
  }

  return null;
};

export default (
  functionCall: FunctionCall,
  functionDefinition: FunctionDefinition,
  state: StateSelector,
): false | string => {
  const argumentz: Argument[] = functionCall.children({ label: 'argument' }) as unknown as Argument[];

  const argsWithWrongFuncDefParams = argumentz.filter((arg: Argument) => {
    return !paramOf(arg, state).parent().is(functionDefinition);
  });

  if (argsWithWrongFuncDefParams.length > 0) {
    return (
      `Arguments (IDs ${argsWithWrongFuncDefParams.map(arg => `${arg.id}`).join(', ')})`
      + " refer to parameters not children of their parent's (function call's) function definition"
    );
  }

  const argumentsWithSameParams = argumentz.filter((arg: Argument) => {
    return argumentz.filter(
      otherArg => paramRefOf(arg) === paramRefOf(otherArg),
    ).length > 1;
  });

  if (argumentsWithSameParams.length > 0) {
    return (
      `Arguments (IDs ${argumentsWithSameParams.map(arg => arg.id).join(', ')})`
      + ' refer to same parameter(s)'
      + ' (ID(s)'
      + [...new Set(argumentsWithSameParams.map(arg => paramOf(arg, state).id))].join(', ')
    );
  }

  const paramIdsRefdByArgs = argumentz.map(arg => paramOf(arg, state).id);

  const unsatisfiedParams = (
    functionDefinition.children({ label: 'parameter' }) as unknown[] as FunctionParameter[]
  ).filter(
    (param: FunctionParameter) => !paramIdsRefdByArgs.includes(param.id),
  );

  if (unsatisfiedParams.length !== 0) {
    return (
      `Parameters (IDs ${unsatisfiedParams.map(param => param.id).join(', ')})`
      + ' are unsatisfied'
    );
  }

  return false;
};
