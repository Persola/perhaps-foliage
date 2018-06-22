// @flow
import presentFunctionParameter from './present-function-parameter.js'
import typedValues from '../../flow-pacifiers/typed-values'

import type { FunctionParameterPres } from '../../types/presentations/function-parameter.js' // eslint-disable-line no-unused-vars
import type { SynoRef } from '../../types/syno-ref.js' // eslint-disable-line no-unused-vars

export default (
  parameterz: {[slotName: string]: SynoRef},
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): FunctionParameterPres[] => {
  return typedValues(parameterz).map((paramRef: SynoRef): FunctionParameterPres => {
    return presentFunctionParameter(getSyno(paramRef), scope, getSyno, focusNodeId);
  });
};
