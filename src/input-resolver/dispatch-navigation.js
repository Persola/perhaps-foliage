// @flow
import type { ReduxStore } from '../types/redux-store'
import type { ParentSynoRef } from '../types/parent-syno-ref'
import type { Syno } from '../types/syno'
import type { EditorState } from '../types/editor-state'

export default (key: string, editorStateStore: ReduxStore) => {
  const editorState: EditorState = editorStateStore.getState();
  const oldFocusedNode: Syno = editorState.synoMap[editorState.stagedNodeId];
  const oldParentRef: ParentSynoRef = oldFocusedNode.parent;
  const oldParent: (Syno | false) = oldParentRef
    ? editorState.synoMap[oldParentRef.id]
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
