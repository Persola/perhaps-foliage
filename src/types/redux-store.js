// @flow
import type { EditorState } from './editor-state';
import type { ReduxAction } from './redux-action';

export type ReduxStore = {|
  +subscribe: (Function) => void,
  +getState: () => EditorState,
  +dispatch: (ReduxAction) => void,
|}
