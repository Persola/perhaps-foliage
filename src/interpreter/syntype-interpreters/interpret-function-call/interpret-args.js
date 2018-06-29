// @flow
import type { Argument } from '../../../types/syntactic-nodes/argument'
import type { BooleanLiteral } from '../../../types/syntactic-nodes/boolean-literal'
import type { SynoRef } from '../../../types/syno-ref'
import type { Syno } from '../../../types/syno'

export default (
  interpreter: Function,
  parentScope: [],
  argumentz: SynoRef[],
  getSyno: Function
): [Argument, BooleanLiteral][] => {
  const interpretedArgs: [Argument, BooleanLiteral][] = [];

  argumentz.forEach((argRef: SynoRef) => {
    const arg: Syno = getSyno(argRef);
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
