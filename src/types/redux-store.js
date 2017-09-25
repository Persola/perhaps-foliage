// @flow
import type { editorState } from './editor-state'
import type { reduxAction } from './redux-action'

export type reduxStore = {
  subscribe: (Function) => void,
  getState: () => editorState,
  dispatch: (reduxAction) => any
}
