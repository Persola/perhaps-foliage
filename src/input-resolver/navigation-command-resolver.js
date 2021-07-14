// @flow
import type { StateSelector } from '../types/state-selector';
import type { ChildPresnoRef } from '../types/child-presno-ref';
import type { ReduxAction } from '../types/redux-action';

export default (key: string, state: StateSelector): ReduxAction => {
  let oldFocusedPresnoRef: ChildPresnoRef;
  if (!state.inPresno()) {
    oldFocusedPresnoRef = {
      synoRef: true,
      id: state.focusedSynoId(),
      relation: 'non-tree',
    };
  } else {
    oldFocusedPresnoRef = {
      synoRef: false,
      parent: {
        synoRef: true,
        id: state.focusedSynoId(),
        relation: 'parent',
      },
      index: 0,
    };
  }

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
    default:
      throw new Error('should be unreachable');
  }

  return ({
    type: 'NAVIGATE',
    oldFocusedPresnoRef,
    direction,
  });
};
