// @flow
import type { StateSelector } from '../types/state-selector';
import type { KeyToNewSynoAttrs } from '../types/language-integration/key-to-new-syno-attrs';
import type { ReduxAction } from '../types/redux-action';
import type { ChildPresnoRef } from '../types/child-presno-ref';
import type { Syntype } from '../extension-staging-area/saliva/types/synos/syntype';
import type { BooleanLiteralAttrs } from '../extension-staging-area/saliva/types/synos/syno-attrs/boolean-literal-attrs';

export default (
  key: string,
  state: StateSelector,
  salivaKeyToNewSynoAttrs: KeyToNewSynoAttrs,
): ReduxAction | false => {
  if (Object.keys(salivaKeyToNewSynoAttrs).includes(key)) {
    // check type validity here
    const focusSyno = state.focusedSyno();
    if (focusSyno.parent) {
      const parent = state.getSyno(focusSyno.parent.id);
      const newSynoType: Syntype = salivaKeyToNewSynoAttrs[key].syntype;
      const { grammar } = state.state;
      const typesAllowedUnderParent: string[] = Object.values(grammar[parent.syntype].children)
        // $FlowIssue: poorly typed ECMA built-in (map)
        .map(childGrammar => childGrammar.syntype);
      if (!typesAllowedUnderParent.includes(newSynoType)) {
        throw new TypeError(`can't add syno of type '${newSynoType}' under parent of type '${parent.syntype}'`);
      }
    }

    return ({
      type: 'REPLACE_FOCUSED_SYNO',
      // $FlowFixMe: types from language integrations?
      newSynoAttrs: (salivaKeyToNewSynoAttrs[key]: BooleanLiteralAttrs),
      newSynoId: `inputValue-${String(Math.random()).substring(2)}`, // TODO: systematic method to generate IDs
      focusedPresnoId: state.focusedSynoId(),
    });
  } if (key === 'backspace') {
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

    return ({
      type: 'DESTROY_FOCUSED_SYNO',
      focusedPresnoId: state.focusedSynoId(),
      oldFocusedPresnoRef,
    });
  }
  return false;
};
