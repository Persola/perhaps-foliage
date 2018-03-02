// @flow
import type { syntacticGraph } from '../syntactic-graph'

export type update = {
  type: 'UPDATE',
  stageful: syntacticGraph
}
