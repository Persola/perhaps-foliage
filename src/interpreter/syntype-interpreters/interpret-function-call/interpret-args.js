// @flow
import type { LiteralValue } from '../../../types/syntactic-nodes/literal-value' // eslint-disable-line no-unused-vars
import type { SynoRef } from '../../../types/syno-ref' // eslint-disable-line no-unused-vars

export default (
  interpreter: Function,
  parentScope: {},
  argumentz: {[slot: string]: SynoRef},
  getSyno: Function
) => {
  const interpretedArgs: { [string]: LiteralValue } = {};

  Object.keys(argumentz).forEach((slotName: string) => {
    const argRef = argumentz[slotName];
    const argResolution = interpreter(
      getSyno(argRef),
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
