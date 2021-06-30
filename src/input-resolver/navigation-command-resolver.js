// @flow
import type { ChildPresnoRef } from '../types/child-presno-ref';
import type { EditorState } from '../types/editor-state';
import type { ReduxAction } from '../types/redux-action';

export default (key: string, editorState: EditorState): ReduxAction => {
  let oldFocusedPresnoRef: ChildPresnoRef;
  if (editorState.focus.presnoIndex === false) {
    oldFocusedPresnoRef = {
      synoRef: true,
      id: editorState.focus.synoId,
      relation: 'non-tree',
    };
  } else {
    oldFocusedPresnoRef = {
      synoRef: false,
      parent: {
        synoRef: true,
        id: editorState.focus.synoId,
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
