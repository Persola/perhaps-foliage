// @noflow
import type { variableRef } from '../types/syntactic-nodes/variable-ref' // eslint-disable-line no-unused-vars

export default (parentScope: {}, ref: variableRef) => {
  return parentScope[ref.name];
}
