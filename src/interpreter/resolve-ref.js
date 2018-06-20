// @flow
import type { variableRef } from '../types/syntactic-nodes/variable-ref' // eslint-disable-line no-unused-vars
import type { literalValue } from '../types/syntactic-nodes/literal-value' // eslint-disable-line no-unused-vars

export default (parentScope: {}, slotName: string): literalValue => {
  return parentScope[slotName];
}
