// @flow
import presentFunctionParameter from './present-function-parameter.js'
import typedValues from '../../flow-pacifiers/typed-values'

import type { functionParameterPres } from '../../types/presentations/function-parameter.js' // eslint-disable-line no-unused-vars
import type { synoRef } from '../../types/syno-ref.js' // eslint-disable-line no-unused-vars

export default (
  parameterz: {[slotName: string]: synoRef},
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): functionParameterPres[] => {
  return typedValues(parameterz).map((paramRef: synoRef): functionParameterPres => {
    return presentFunctionParameter(getSyno(paramRef), scope, getSyno, focusNodeId);
  });
};
