// @flow
import type { LiteralValue } from '../../../types/syntactic-nodes/literal-value'
import type { SynoRef } from '../../../types/syno-ref'
import type { Syno } from '../../../types/syno'

export default (
  interpreter: Function,
  parentScope: {},
  argumentz: {[slot: string]: SynoRef},
  getSyno: Function
) => {
  const interpretedArgs: { [string]: LiteralValue } = {};

  Object.keys(argumentz).forEach((slotName: string) => {
    const argRef: SynoRef = argumentz[slotName];
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
      interpretedArgs[slotName] = argResolution.result;
    } else {
      throw new Error('arg interp failed');
    }
  })

  return interpretedArgs;
};
