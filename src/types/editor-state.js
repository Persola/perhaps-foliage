// @flow
import type { result } from './result'
import type { syntacticGraph } from './syntactic-graph'

export type editorState = {
  graphs: syntacticGraph[],
  stagedGraphIndex: number,
  result: result
}
