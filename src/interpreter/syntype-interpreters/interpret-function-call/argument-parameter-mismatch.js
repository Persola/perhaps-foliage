// @flow
import type { SynoId } from '../../../types/syno-id'
import type { FunctionDefinition } from '../../../types/syntactic-nodes/function-definition'
import type { Argument } from '../../../types/syntactic-nodes/argument'
import type { BooleanLiteral } from '../../../types/syntactic-nodes/boolean-literal'

export default (
  resolvedCallee: FunctionDefinition,
  argumentz: Argument[],
  getSyno: Function
): string => {
  const paramIds = resolvedCallee.parameters.map(paramRef => paramRef.id);
  const argTargetIds = argumentz.map(arg => arg.parameter.id);

  const duplicatedParamIds = paramIds.filter((paramId: SynoId) => {
    return paramIds.filter(compId => paramId === compId).length > 1;
  });
  const duplicatedArgTargetIds = argTargetIds.filter((argId: SynoId) => {
    return paramIds.filter(compId => argId === compId).length > 1;
  });

  if (duplicatedParamIds.length > 0) {
    return `duplicate param IDs: ${duplicatedParamIds.join(', ')}`;
  }
  if (duplicatedArgTargetIds.length > 0) {
    return `duplicate arg target IDs: ${duplicatedArgTargetIds.join(', ')}`;
  }

  const unsatisfiedParamIds = paramIds.filter((paramId: string) => {
    return !argTargetIds.includes(paramId);
  });
  const extraArgTargetIds = argTargetIds.filter((argId: string) => {
    return !paramIds.includes(argId);
  });

  const unsatisfiedParamNames = unsatisfiedParamIds.map(paramId => {
    return getSyno(paramId).name;
  });
  const extraArgTargetNames = extraArgTargetIds.map(argTargetId => {
    return getSyno(argTargetId).name;
  });

  if ((unsatisfiedParamIds.length > 0) || (extraArgTargetIds.length > 0)) {
    return `function "${resolvedCallee.name}" called with wrong parameters (unsatisfied: ${unsatisfiedParamNames.join(', ')}; extra: ${extraArgTargetNames.join(', ')})`;
  }
};
