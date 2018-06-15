// @flow
import type { synoId } from './syno-id'
import type { synoRef } from './syno-ref'

export type editorState = {
  stagedNodeId: synoId,
  resultNodeId: synoId,
  graphs: {  [synoId: synoId]: synoRef }
}
