// @flow
import dupGraphs from '../../syntree-utils/dup-graphs.js'
import typedKeys from '../../flow-pacifiers/typed-keys'

import type { SynoMap } from '../../types/editor-state/syno-map'
import type { ReduxAction } from '../../types/redux-action'

export default (oldState: SynoMap, action: ReduxAction): SynoMap => {
  const newSynoMap: SynoMap = dupGraphs(oldState);

  switch (action.type) {
    case 'REPLACE_FOCUSED_NODE': {
      const { newSynoAttrs, newSynoId, stagedNodeId } = action;
      const newSyno = Object.assign({}, newSynoAttrs, { id: newSynoId });

      const parentRef = oldState[stagedNodeId].parent;
      if (parentRef) {
        const parent = oldState[parentRef.id];
        if (
          parent.syntype === 'functionCall' &&
          typedKeys(parent.argumentz).length > 0
        ) {
          const focusedNodeArgumentKey = typedKeys(parent.argumentz).find(argKey => {
            return (parent.argumentz[argKey].id === stagedNodeId);
          });
          if (!focusedNodeArgumentKey) { throw new Error; }
          // should remove any uneeded (i.e., deleted) nodes from store
          const newParent = newSynoMap[parent.id];
          if (newParent.syntype !== 'functionCall') { throw new Error; }
          newParent.argumentz[focusedNodeArgumentKey] = {
            synoRef: true,
            id: newSynoId
          }
        }

        newSyno.parent = {
          synoRef: true,
          id: parentRef.id
        }
      } else {
        newSyno.parent = false;
      }

      newSynoMap[newSynoId] = newSyno;

      return newSynoMap;
    }
    case 'UPDATE_RESULT': {
      const { result } = action;
      if (result.syntype !== 'booleanLiteral') {
        throw new Error('fuck, I cant update result unless its a single boolean literal, need to deconstruct refs');
      }
      newSynoMap[result.id] = result;

      return newSynoMap;
    }
    case 'NAVIGATE': {
      return oldState;
    }
    case 'SET_FOCUS_SYNO': {
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
