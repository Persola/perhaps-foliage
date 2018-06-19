// @flow
import dupGraphs from '../../syntree-utils/dup-graphs.js'
import type { synoMap } from '../../types/editor-state/syno-map'
import type { reduxAction } from '../../types/redux-action'

export default (oldState: synoMap, action: reduxAction): synoMap => {
  const newSynoMap: synoMap = dupGraphs(oldState);

  switch (action.type) {
    case 'INITIALIZE':
      return oldState;
    case 'REPLACE_FOCUSED_NODE':
      const { newSynoAttrs, newSynoId, stagedNodeId } = action;
      const newSyno = Object.assign({}, newSynoAttrs, { id: newSynoId });

      const parentRef = oldState[stagedNodeId].parent;
      if (parentRef) {
        const parent = oldState[parentRef.id];

        if (parent.argumentz && Object.keys(parent.argumentz).length > 0) {
          const focusedNodeArgumentKey = Object.keys(parent.argumentz).find(argKey => {
            return (parent.argumentz[argKey].id === stagedNodeId);
          });
          // should remove any uneeded (i.e., deleted) nodes from store
          const newParent = newSynoMap[parent.id];
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
    case 'UPDATE_RESULT':
      const { result, resultRootId } = action;
      if (result.syntype !== 'booleanLiteral') {
        throw new Error('fuck, I cant update result unless its a single boolean literal, need to deconstruct refs');
      }
      newSynoMap[resultRootId] = result;

      return newSynoMap;
    case 'NAVIGATE':
      return oldState;
    case '@@redux/INIT':
      return oldState;
    default:
      throw new Error(`Unrecognized action type: '${action.type}'`);
  }
}
