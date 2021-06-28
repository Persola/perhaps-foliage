// @flow
import salivaKeyToNewSynoAttrs from '../extension-staging-area/saliva/input-resolver/key-to-new-syno-attrs.js';

import type { EditorState } from '../types/editor-state';
import type { ChildPresnoRef } from '../types/child-presno-ref';
import type { Syntype } from '../extension-staging-area/saliva/types/synos/syntype';

export default (key: string, editorState: EditorState) => {
  const { focus: { synoId } } = editorState;

  if (Object.keys(salivaKeyToNewSynoAttrs).includes(key)) {
    // check type validity here
    const focusSyno = editorState.synoMap[editorState.focus.synoId];
    if (focusSyno.parent) {
      const parent = editorState.synoMap[focusSyno.parent.id];
      const newSynoType: Syntype = salivaKeyToNewSynoAttrs[key].syntype;
      const { grammar } = editorState;
      const typesAllowedUnderParent: string[] = Object.values(grammar[parent.syntype].children)
        // $FlowIssue: poorly typed ECMA built-in (map)
        .map(childGrammar => childGrammar.syntype);
      if (!typesAllowedUnderParent.includes(newSynoType)) {
        throw new TypeError(`can't add syno of type '${newSynoType}' under parent of type '${parent.syntype}'`);
      }
    }

    return ({
      type: 'REPLACE_FOCUSED_SYNO',
      newSynoAttrs: salivaKeyToNewSynoAttrs[key],
      newSynoId: `inputValue-${String(Math.random()).substring(2)}`, // TODO: systematic method to generate IDs
      focusedPresnoId: synoId,
    });
  } if (key === 'backspace') {
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

    return ({
      type: 'DESTROY_FOCUSED_SYNO',
      focusedPresnoId: synoId,
      oldFocusedPresnoRef,
    });
  }
  return false;
};
