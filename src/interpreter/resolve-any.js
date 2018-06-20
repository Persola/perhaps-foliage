// @flow
import resolveRef from './resolve-ref.js'
import type { syno } from '../types/syno' // eslint-disable-line no-unused-vars
import type { literalValue } from '../types/syntactic-nodes/literal-value' // eslint-disable-line no-unused-vars

export default (
  parentScope: {},
  argumentz: {},
  getSyno: Function
): {[string]: literalValue} => {
  const resolvedArgs: { [string]: literalValue } = {};

  Object.keys(argumentz).forEach((slotName: string) => {
    const argRef = argumentz[slotName];
    const arg = getSyno(argRef);
    const resolvedArg: literalValue = (
      (arg.syntype === 'variableRef') ?
      resolveRef(parentScope, arg.name) : // should check type
      arg
    );
    resolvedArgs[slotName] = resolvedArg;
  })

  return resolvedArgs;
}
