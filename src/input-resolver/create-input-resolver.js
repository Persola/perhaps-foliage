// @flow
import dispatchNodeReplacement from './dispatch-node-replacement.js'
import dispatchNavigation from './dispatch-navigation.js'

import type { reduxStore } from '../types/redux-store'
import type { sideEffectFunction } from '../types/side-effect-function'

export default (editorStateStore: reduxStore, interpret: sideEffectFunction) => {
  return (key: string) => {
    if(['0', '1', 'f', 't'].includes(key)) {
      dispatchNodeReplacement(key, editorStateStore);
    } else if (['left', 'right', 'up', 'down'].includes(key)) {
      dispatchNavigation(key, editorStateStore);
    } else if (key === 'enter') {
      interpret();
    } else {
      throw new Error('key bindings out of sync');
    }
  }
}
