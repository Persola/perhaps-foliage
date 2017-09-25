// @flow
import type { syntacticGraph } from './syntactic-graph'
import type { result } from './result'

export type presentation = {
  stageful: syntacticGraph,
  result: result
}
