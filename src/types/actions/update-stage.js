// @flow
import type { syntacticGraph } from '../syntactic-graph'

export type updateStage = {
  type: 'UPDATE_STAGE',
  stageful: syntacticGraph
}
