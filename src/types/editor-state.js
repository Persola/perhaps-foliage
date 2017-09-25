// @flow
import type { syntacticGraph } from './syntactic-graph'
import type { result } from './result'

export type editorState = {
  stageful: syntacticGraph,
  result: result
}
