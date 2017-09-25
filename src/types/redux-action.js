// @flow
import type { syntacticGraph } from './syntactic-graph'
import type { result } from './result'

export type reduxAction = {
  type: ('@@redux/INIT' | 'UPDATE' | 'UPDATE_RESULT'),
  stageful?: syntacticGraph,
  result?: result
}
