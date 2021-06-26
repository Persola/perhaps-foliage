// @flow
import synoCommandResolver from './syno-command-resolver.js'
import navigationCommandResolver from './navigation-command-resolver.js'
import textCommandResolver from './text-command-resolver.js'

import type { ReduxStore } from '../types/redux-store'
import type { SideEffectFunction } from '../types/side-effect-function'

export default (editorStateStore: ReduxStore, interpret: SideEffectFunction) => {
  return (key: string) => {
    if (key === 'enter') {
      interpret();
      return;
    }

    const editorState = editorStateStore.getState();
    const focus = editorState.focus;
    let command = false;
    if (['left', 'right', 'up', 'down'].includes(key)) {
      command = navigationCommandResolver(key, editorState);
    } else if (focus.charIndex !== false) { // text commands
      command = textCommandResolver(key, editorState);
    // } else if (focus.presnoIndex !== false) {
    //   throw new Error('this should be unreachable still');
      // because if the focus has a presnoIndex there should also be a charIndex
      // to do: commands for non-text presnos
    } else {
      command = synoCommandResolver(key, editorState);
    }

    if (command !== false) {
      editorStateStore.dispatch(command);      
    }
  }
}
