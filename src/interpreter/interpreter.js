// @flow
import interpretFunctionCall from './syntype-interpreters/interpret-function-call.js'
import resolveRef from './resolve-ref.js'

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
    case 'booleanLiteral': {
      return {
        success: true,
        result: stagedSyno
      };
    }
    case 'functionCall': { // eslint-disable-line
      return interpretFunctionCall(interpreter, scope, stagedSyno, getSyno);
    }
    case 'variableRef': {
      // should check type
      const value = resolveRef(scope, stagedSyno.name);
      if ((typeof value) !== 'object') {
        throw new Error(`variable '${stagedSyno.name}' resolved wrong`);
      }
      return {
        success: true,
        result: value
      };
    }
    default: {
      throw new Error('invalid syntactic node (unrecognized type)');
    }
  }
}

export default interpreter
