// @flow
import type { syntacticGraph } from './syntactic-graph'

export type presentation = {
  stageful: syntacticGraph,
  result?: syntacticGraph
}
