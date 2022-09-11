import type { InterpretationResolution } from 'perhaps-foliage/dist/types/interpreter/interpretation-resolution';

import type { RawBooleanLiteral } from '../../../types/synos/raw/boolean-literal';

const nor = (
  firstArg: RawBooleanLiteral,
  secondArg: RawBooleanLiteral,
): RawBooleanLiteral => {
  const resultValue = !(firstArg.attrs.value || secondArg.attrs.value);

  return {
    id: `interpResult-${String(Math.random()).substring(2)}`,
    type: 'booleanLiteral',
    attrs: { value: resultValue },
    rootwardEdgeLabel: null,
    parentId: null,
    childIds: [],
    intratreeRefs: {},
    intertreeRefs: {},
  };
};

export default (
  argumentz: RawBooleanLiteral[],
): InterpretationResolution => {
  if (argumentz.length !== 2) {
    return {
      success: false,
      error: {
        message: `NOR recieved wrong number of arguments (${argumentz.length} instead of 2)`,
      },
    };
  }

  return {
    success: true,
    result: nor(argumentz[0], argumentz[1]),
  };
};
