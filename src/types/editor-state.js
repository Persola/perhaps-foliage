// @flow
import type { result } from './result'
import type { syntacticGraph } from './syntactic-graph'

export type editorState = {
  drafts: syntacticGraph[],
  stagedDraftIndex: number,
  result: result
}
