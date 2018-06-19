// @flow
import interpretFunctionCall from './syntype-interpreters/interpret-function-call.js'
import type { interpretationResolution } from '../types/interpreter/interpretation-resolution' // eslint-disable-line no-unused-vars
import type { syno } from '../types/syno' // eslint-disable-line no-unused-vars
import type { synoMap } from '../types/editor-state/syno-map' // eslint-disable-line no-unused-vars
import type { graphId } from '../types/graph-id' // eslint-disable-line no-unused-vars

const interpreter = (
  stagedSyno: syno,
  scope: {},
  getSyno: Function
): interpretationResolution => {
  switch (stagedSyno.syntype) {
    case 'booleanLiteral':
      return {
        success: true,
        result: stagedSyno
      };
    case 'functionCall': // eslint-disable-line
      return interpretFunctionCall(interpreter, scope, stagedSyno, getSyno);
    default:
      throw new Error('invalid syntactic node (unrecognized type)');
  }
}

export default interpreter
