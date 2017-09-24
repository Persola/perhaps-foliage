// @flow
import type { editorState } from './editor-state'

export type reduxStore = {
  subscribe: (Function) => void,
  getState: () => editorState
}
