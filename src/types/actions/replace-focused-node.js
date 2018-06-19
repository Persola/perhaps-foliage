// @flow
import type { synoId } from '../syno-id'

export type replaceFocusedNode = {
  type: 'REPLACE_FOCUSED_NODE',
  newSynoAttrs: {
    syntype: 'booleanLiteral',
    value: boolean
  },
  newSynoId: synoId,
  stagedNodeId: synoId
}
