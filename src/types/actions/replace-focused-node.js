// @flow
import type { SynoId } from '../syno-id'

export type ReplaceFocusedNode = {
  type: 'REPLACE_FOCUSED_NODE',
  newSynoAttrs: {
    syntype: 'booleanLiteral',
    value: boolean
  },
  newSynoId: SynoId,
  focusedSynoId: SynoId
}
