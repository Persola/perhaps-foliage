import type { EditorState } from './editor-state';
import type { ReduxAction } from './redux-action';

export type ReduxStore = {
  readonly subscribe: (arg0: (...args: Array<any>) => any) => void;
  readonly getState: () => EditorState;
  readonly dispatch: (arg0: ReduxAction) => void;
};
