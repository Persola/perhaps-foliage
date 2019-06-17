// @flow
import synoChangeCommand from './syno-change-command.js'
import navigationCommand from './navigation-command.js'
import charBackspace from './char-backspace.js'

import type { ReduxStore } from '../types/redux-store'
import type { SideEffectFunction } from '../types/side-effect-function'

export default (editorStateStore: ReduxStore, interpret: SideEffectFunction) => {
  return (key: string) => {
    const editorState = editorStateStore.getState();
    let command;
    if(['0', '1', 'f', 't'].includes(key)) {
      command = synoChangeCommand(key, editorState);
    } else if (['left', 'right', 'up', 'down'].includes(key)) {
      command = navigationCommand(key, editorState);
    } else if (key === 'backspace') {
      command = charBackspace(editorState);
    } else if (key === 'enter') {
      interpret();
    } else {
      throw new Error('key bindings out of sync');
    }

    if (command !== undefined) {
      editorStateStore.dispatch(command);
    }
  }
}
