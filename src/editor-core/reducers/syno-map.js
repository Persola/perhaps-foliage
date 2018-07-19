// @flow
import dup from '../../syntree-utils/dup.js'

import type { Syno } from '../../types/syno'
import type { SynoMap } from '../../types/syno-map'
import type { BooleanLiteral } from '../../types/syntactic-nodes/boolean-literal'
import type { ReduxAction } from '../../types/redux-action'

export default (oldState: SynoMap, action: ReduxAction): SynoMap => {
  const newSynoMap: SynoMap = dup(oldState);

  switch (action.type) {
    case 'REPLACE_FOCUSED_NODE': {
      const { newSynoAttrs, newSynoId, focusedSynoId } = action;

      const parentRef = oldState[focusedSynoId].parent;
      let parentAttr;
      if (parentRef) {
        const parent: Syno = oldState[parentRef.id];
        if (parent.syntype === 'argument') {
          // should remove any uneeded (i.e., deleted) nodes from store
          const newParent = newSynoMap[parent.id];
          if (newParent.syntype !== 'argument') { throw new Error }
          newParent.value = {
            synoRef: true,
            id: newSynoId
          }
        } else {
          throw new Error('cannot replace non-argument');
        }

        parentAttr = {
          synoRef: true,
          id: parentRef.id
        }
      } else {
        parentAttr = false;
      }

      const newSyno: BooleanLiteral = Object.assign({}, newSynoAttrs, {
        id: newSynoId,
        parent: parentAttr
      });
      newSynoMap[newSynoId] = newSyno;

      return newSynoMap;
    }
    case 'END_INTERPRETATION': {
      const { result } = action;
      newSynoMap[result.id] = result;

      return newSynoMap;
    }
    case 'NAVIGATE': {
      return oldState;
    }
    case 'SET_FOCUS_SYNO': {
      return oldState;
    }
    case 'START_INTERPRETATION': {
      return oldState;
    }
    case '@@redux/INIT': {
      return oldState;
    }
    case '@@INIT': {
      return oldState;
    }
    default: {
      throw new Error(`Unrecognized action type: '${action.type}'`);
    }
  }
}
