// @noflow
import resolveRef from './resolve-ref.js'
import type { syntacticGraph } from '../types/syntactic-graph' // eslint-disable-line no-unused-vars
import type { functionArgument } from '../types/function-call/function-argument' // eslint-disable-line no-unused-vars

export default (parentScope: {}, argumentz: {}): {} => {
  const resolvedArgs = {};

  Object.keys(argumentz).forEach((slotName: string): functionArgument => {
    const arg = argumentz[slotName];
    const resolvedArg = (
      (arg.klass === 'variableRef') ?
      resolveRef(parentScope, arg.name) : // should check type
      arg
    );
    resolvedArgs[slotName] = resolvedArg;
  })

  return resolvedArgs;
}
