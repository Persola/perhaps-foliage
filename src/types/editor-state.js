// @flow
import type { synoId } from './syno-id'
import type { synoRef } from './syno-ref'

export type editorState = {
  graphs: {  [synoId: synoId]: synoRef },
  stagedNodeId: synoId,
  resultNodeId: synoId,
  resultOutdated: boolean
}
