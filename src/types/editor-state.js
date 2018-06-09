// @flow
import type { syntacticGraphMap } from './syntactic-graph-map'

export type editorState = {
  graphs: syntacticGraphMap,
  stagedGraphKey: string,
  resultGraphKey: string
}
