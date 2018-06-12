// @noflow
import type { functionArgument } from '../types/syntactic-nodes/function-call/function-argument' // eslint-disable-line no-unused-vars

export default (parentScope: {}, argumentz: functionArgument[]) => {
  return argumentz.map((arg: functionArgument): functionArgument => {
    if (arg.klass === 'variableRef') {
      return parentScope[arg.name];
    } else {
      return arg;
    }
  });
}
