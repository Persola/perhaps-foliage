// @flow
import presentFunctionParameter from '../syntypes/present-function-parameter.js'
import typedValues from '../../../flow-pacifiers/typed-values'

import type { FunctionParameterPres } from '../../../types/presentations/function-parameter.js'
import type { SynoRef } from '../../../types/syno-ref.js'

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
