// @flow
import type { LiteralValue } from '../types/syntactic-nodes/literal-value' // eslint-disable-line no-unused-vars

export default (parentScope: {}, slotName: string): LiteralValue => {
  return parentScope[slotName];
}
