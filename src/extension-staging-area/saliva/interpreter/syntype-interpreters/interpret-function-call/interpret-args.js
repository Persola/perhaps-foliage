// @flow
import type { Argument } from '../../../types/synos/argument'
import type { BooleanLiteral } from '../../../types/synos/boolean-literal'
import type { Syno } from '../../../../../types/syno'

export default (
  interpreter: Function,
  parentScope: [],
  argumentz: Argument[],
  getSyno: Function
): [Argument, BooleanLiteral][] => {
  const interpretedArgs: [Argument, BooleanLiteral][] = [];

  argumentz.forEach((arg: Argument) => {
    if (arg.syntype !== 'argument') {
      throw new Error(`expected argument, got ${arg.syntype}`)
    }
    const argResolution = interpreter(
      getSyno(arg.value),
      parentScope,
      getSyno
    )

    if (argResolution.success) {
      interpretedArgs.push([arg, argResolution.result]);
    } else {
      throw new Error('arg interp failed');
    }
  })

  return interpretedArgs;
};
