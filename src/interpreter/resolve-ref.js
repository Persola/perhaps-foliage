// @flow
import type { SynoId } from '../types/syno-id'
import type { LiteralValue } from '../types/syntactic-nodes/literal-value'

export default (parentScope: {}, slotName: string): LiteralValue => {
  return parentScope[slotName];
}
