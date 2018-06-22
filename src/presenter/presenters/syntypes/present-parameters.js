// @flow
import presentFunctionParameter from '../syntypes/present-function-parameter.js'
import typedValues from '../../../flow-pacifiers/typed-values'

import type { FunctionParameterPres } from '../../../types/presentations/function-parameter.js'
import type { SynoRef } from '../../../types/syno-ref.js'

export default (
  parameters: {[slotName: string]: SynoRef},
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): FunctionParameterPres[] => {
  return typedValues(parameters).map((paramRef: SynoRef): FunctionParameterPres => {
    return presentFunctionParameter(getSyno(paramRef), scope, getSyno, focusNodeId);
  });
};
