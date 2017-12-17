// @flow
import type { reduxStore } from '../types/redux-store'
import type { sideEffectFunction } from '../types/side-effect-function'

export default (editorStateStore: reduxStore, interpret: sideEffectFunction) => {
  return (key: string) => {
    if(['0', '1'].includes(key)) {
      return () => {
        editorStateStore.dispatch({
          type: 'UPDATE',
          stageful: {
            klass: 'booleanLiteral',
            value: Boolean(Number(key))
          }
        });
      }
    } else if (key === 'enter') {
      interpret();
    }

    return false;
  }
}
