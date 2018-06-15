// @flow
import type { syntacticGraph } from '../syntactic-graph'

export type replaceFocusedNode = {
  type: 'REPLACE_FOCUSED_NODE',
  newSynoAttrs: syntacticGraph
}
