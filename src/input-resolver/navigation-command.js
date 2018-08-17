// @flow
import type { ParentSynoRef } from '../types/parent-syno-ref'
import type { Syno } from '../types/syno'
import type { EditorState } from '../types/editor-state'

export default (key: string, editorState: EditorState) => {
  const oldFocusedPresno: Syno = editorState.synoMap[editorState.focus.synoId];
  const oldParentRef: ParentSynoRef = oldFocusedPresno.parent;
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

  return ({
    type: 'NAVIGATE',
    direction,
    oldFocusedPresno,
    oldParent
  });
}
