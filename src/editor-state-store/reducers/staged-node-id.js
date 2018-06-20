// @flow
import typedValues from '../../flow-pacifiers/typed-values'

import type { stagedNodeId } from '../../types/editor-state/staged-node-id'
import type { synoRef } from '../../types/syno-ref'
import type { reduxAction } from '../../types/redux-action'

export default (oldState: stagedNodeId, action: reduxAction): stagedNodeId => {
  switch (action.type) {
    case 'INITIALIZE': {
      return oldState;
    }
    case 'REPLACE_FOCUSED_NODE': {
      return action.newSynoId;
    }
    case 'UPDATE_RESULT': {
      return oldState;
    }
    case 'NAVIGATE': {
      // needs parent and self, or their children ids
      const { direction, oldFocusedNode, oldParent } = action;
      let newStagedNodeId;

      switch (direction) {
        case 'out': {
          if (!oldParent) { throw new Error('navigate failed; no parent!'); }
          newStagedNodeId = oldParent.id;
          break;
        }
        case 'in': {
          if (
            oldFocusedNode.syntype === 'functionCall' &&
            Object.keys(oldFocusedNode.argumentz).length > 0
          ) {
            const argumentRef: synoRef = typedValues(oldFocusedNode.argumentz)[0];
            newStagedNodeId = argumentRef.id;
          } else {
            throw new Error('navigate failed; no argumentz!');
          }
          break;
        }
        case 'prev': {
          if (!oldParent) { throw new Error('navigate failed; no parent!'); }
          if (
            oldParent.syntype === 'functionCall' &&
            Object.keys(oldParent.argumentz).length > 0
          ) {
            newStagedNodeId = typedValues(oldParent.argumentz)[0].id
          } else {
            throw new Error('navigate failed; no argumentz!');
          }
          break;
        }
        case 'next': {
          if (!oldParent) { throw new Error('navigate failed; no parent!'); }
          if (
            oldParent.syntype === 'functionCall' &&
            Object.keys(oldParent.argumentz).length > 1
          ) {
            newStagedNodeId = typedValues(oldParent.argumentz)[1].id
          } else {
            throw new Error('navigate failed; no second argument!');
          }
          break;
        }
        default: {
          throw new Error('unrecognized navigation direction');
        }
      }

      return newStagedNodeId;
    }
    case '@@redux/INIT': {
      return oldState;
    }
    default: {
      throw new Error(`Unrecognized action type: '${action.type}'`);
    }
  }
}
