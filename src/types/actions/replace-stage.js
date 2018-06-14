// @flow
import type { syntacticGraph } from '../syntactic-graph'

export type replaceStage = {
  type: 'REPLACE_STAGE',
  stageful: syntacticGraph
}
