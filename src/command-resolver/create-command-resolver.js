// @flow
import type { reduxStore } from '../types/redux-store'
import type { sideEffectFunction } from '../types/side-effect-function'

export default (editorStateStore: reduxStore, interpret: sideEffectFunction) => {
  return (key: string) => {
    if(['0', '1', 'f', 't'].includes(key)) {
      const value = (
        ['0', '1'].includes(key)
        ? Boolean(Number(key))
        : key === 'f' ? false : true
      )

      return () => {
        editorStateStore.dispatch({
          type: 'REPLACE_FOCUSED_NODE',
          newSynoAttrs: {
            klass: 'booleanLiteral',
            value
          }
        });
      }
    } else if (['left', 'right', 'up', 'down'].includes(key)) {
      return () => {
        let direction;
        switch (key) {
          case 'left':
            direction = 'out';
            break;
          case 'right':
            direction = 'in';
            break;
          case 'up':
            direction = 'prev';
            break;
          case 'down':
            direction = 'next';
            break;
        }

        editorStateStore.dispatch({
          type: 'NAVIGATE',
          direction
        });
      }
    } else if (key === 'enter') {
      interpret();
    }

    return false;
  }
}
