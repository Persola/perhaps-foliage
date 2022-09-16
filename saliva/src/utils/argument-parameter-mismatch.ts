import Argument from '../synos/argument';
import FunctionCall from '../synos/function-call';
import FunctionDefinition from '../synos/function-definition';
import FunctionParameter from '../synos/function-parameter';

export default (
  functionCall: FunctionCall,
  functionDefinition: FunctionDefinition,
): false | string => {
  const argumentz = functionCall.argumentz();

  const argsWithoutParams = argumentz.filter(arg => arg.parameter() === null);

  if (argsWithoutParams.length > 0) {
    return (
      `Argument(s) (IDs ${argsWithoutParams.map(arg => `${arg.id}`).join(', ')})`
      + ' lack(s) (a) parameter(s)'
    );
  }

  const argsWithWrongFuncDefParams = argumentz.filter((arg: Argument) => {
    return !arg.parameter().parent().is(functionDefinition);
  });

  if (argsWithWrongFuncDefParams.length > 0) {
    return (
      `Arguments (IDs ${argsWithWrongFuncDefParams.map(arg => `${arg.id}`).join(', ')})`
      + " refer to parameters not children of their parent's (function call's) function definition"
    );
  }

  const argumentsWithSameParams = argumentz.filter((arg: Argument) => {
    return argumentz.filter(
      otherArg => arg.parameter().is(otherArg.parameter()),
    ).length > 1;
  });

  if (argumentsWithSameParams.length > 0) {
    return (
      `Arguments (IDs ${argumentsWithSameParams.map(arg => arg.id).join(', ')})`
      + ' refer to same parameter(s)'
      + ' (ID(s)'
      + [...new Set(argumentsWithSameParams.map(arg => arg.parameter().id))].join(', ')
    );
  }

  const paramIdsRefdByArgs = argumentz.map(arg => arg.parameter().id);

  const unsatisfiedParams = functionDefinition.parameters().filter(
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
