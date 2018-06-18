// @flow
import type { synoId } from '../syno-id'

export type replaceFocusedNode = {
  type: 'REPLACE_FOCUSED_NODE',
  newSynoAttrs: {
    klass: 'booleanLiteral',
    value: boolean
  },
  newSynoId: synoId,
  stagedNodeId: synoId
}
