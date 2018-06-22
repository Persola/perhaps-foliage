// @flow
import type { LiteralValue } from '../types/syntactic-nodes/literal-value'

export default (parentScope: {}, slotName: string): LiteralValue => {
  return parentScope[slotName];
}
