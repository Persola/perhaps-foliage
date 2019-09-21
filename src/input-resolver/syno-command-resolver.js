// @flow
import salivaKeyToNewSynoAttrs from '../extension-staging-area/saliva/input-resolver/key-to-new-syno-attrs.js'

import type { EditorState } from '../types/editor-state'
import type { ChildPresnoRef } from '../types/child-presno-ref'

export default (key: string, editorState: EditorState) => {
  const { focus: { synoId } } = editorState;

  if (Object.keys(salivaKeyToNewSynoAttrs).includes(key)) {

    // check type validity here
    const focusSyno = editorState.synoMap[editorState.focus.synoId].parent;
    const parent = parent && editorState.synoMap[focusSyno.parent.id];
    if (parent && !Object.keys(editorState.grammar[parent.syntype].children).includes(salivaKeyToNewSynoAttrs[key].syntype)) {
      console.warn('replacement disallowed for this syntactic context');
      return ({ type: 'NO_OP' });
    }

    return ({
      type: 'REPLACE_FOCUSED_SYNO',
      newSynoAttrs: salivaKeyToNewSynoAttrs[key],
      newSynoId: `inputValue-${String(Math.random()).substring(2)}`, // TODO: systematic method to generate IDs
      focusedPresnoId: synoId
    });
  } else if (key === 'backspace') {
    let oldFocusedPresnoRef: ChildPresnoRef;
    if (editorState.focus.presnoIndex === false) {
      oldFocusedPresnoRef = {
        synoRef: true,
        id: editorState.focus.synoId
      };
    } else {
      oldFocusedPresnoRef = {
        synoRef: false,
        parent: {
          synoRef: true,
          id: editorState.focus.synoId
        },
        index: 0
      }
    }
    
    return ({
      type: 'DESTROY_FOCUSED_SYNO',
      focusedPresnoId: synoId,
      oldFocusedPresnoRef
    });
  } else {
    return false;
  }
}
