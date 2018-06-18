// @flow
import resolveRef from './resolve-ref.js'
import type { syno } from '../types/syno' // eslint-disable-line no-unused-vars
import type { functionArgument } from '../types/syntactic-nodes/function-call/function-argument' // eslint-disable-line no-unused-vars

export default (parentScope: {}, argumentz: {}, getSyno: Function): {} => {
  const resolvedArgs = {};

  Object.keys(argumentz).forEach((slotName: string): functionArgument => {
    const argRef = argumentz[slotName];
    const arg = getSyno(argRef);
    const resolvedArg = (
      (arg.klass === 'variableRef') ?
      resolveRef(parentScope, arg.name) : // should check type
      arg
    );
    resolvedArgs[slotName] = resolvedArg;
  })

  return resolvedArgs;
}
