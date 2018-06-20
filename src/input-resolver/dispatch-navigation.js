// @flow
import type { reduxStore } from '../types/redux-store'
import type { parentSynoRef } from '../types/parent-syno-ref'
import type { syno } from '../types/syno'

export default (key: string, editorStateStore: reduxStore) => {
  const editorState: editorState = editorStateStore.getState();
  const oldFocusedNode: syno = editorState.graphs[editorState.stagedNodeId];
  const oldParentRef: parentSynoRef = oldFocusedNode.parent;
  const oldParent: (syno | false) = oldParentRef
    ? editorState.graphs[oldParentRef.id]
    : false;
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

  editorStateStore.dispatch({
    type: 'NAVIGATE',
    direction,
    oldFocusedNode,
    oldParent
  });
}
