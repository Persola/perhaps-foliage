// @flow
import typedValues from '../../flow-pacifiers/typed-values'

import type { FocusedSynoId } from '../../types/editor-state/focused-syno-id'
import type { Syno } from '../../types/syno'
import type { SynoRef } from '../../types/syno-ref'
import type { ReduxAction } from '../../types/redux-action'

const childRefs = (syno: Syno): SynoRef[] => {
  switch (syno.syntype) {
    case 'functionCall': {
      return typedValues(syno.argumentz);
    }
    case 'functionDefinition': {
      const childRefs = typedValues(syno.parameters);
      childRefs.push(syno.body);
      return childRefs;
    }
    default: {
      return [];
    }
  }
};

export default (oldState: FocusedSynoId, action: ReduxAction): FocusedSynoId => {
  switch (action.type) {
    case 'REPLACE_FOCUSED_NODE': {
      return action.newSynoId;
    }
    case 'UPDATE_RESULT': {
      return oldState;
    }
    case 'NAVIGATE': {
      // needs parent and self, or their children ids
      const { direction, oldFocusedSyno, oldParent } = action;
      let newStagedNodeId;

      switch (direction) {
        case 'out': {
          if (!oldParent) { throw new Error('navigate failed; no parent!'); }
          newStagedNodeId = oldParent.id;
          break;
        }
        case 'in': {
          if (childRefs(oldFocusedSyno).length > 0) {
            newStagedNodeId = childRefs(oldFocusedSyno)[0].id;
          } else {
            throw new Error('navigate failed; no children!');
          }
          break;
        }
        case 'prev': {
          if (!oldParent) { throw new Error('navigate failed; no parent!'); }
          if (childRefs(oldParent).length > 0) {
            const oldFocusedSynoBirthOrder = childRefs(oldParent).findIndex((childRef) => {
              return childRef.id === oldState;
            });
            if (oldFocusedSynoBirthOrder === -1) {
              throw new Error("cannot find old focused syno ID among parent's children");
            } else if (oldFocusedSynoBirthOrder === 0) {
              throw new Error('no previous sibling');
            } else {
              newStagedNodeId = childRefs(oldParent)[oldFocusedSynoBirthOrder - 1].id;
            }
          } else {
            throw new Error('navigate failed; no argumentz!');
          }
          break;
        }
        case 'next': {
          if (!oldParent) { throw new Error('navigate failed; no parent!'); }
          if (childRefs(oldParent).length > 0) {
            const oldFocusedSynoBirthOrder = childRefs(oldParent).findIndex((childRef) => {
              return childRef.id === oldState;
            });
            if (oldFocusedSynoBirthOrder === -1) {
              throw new Error("cannot find old focused syno ID among parent's children");
            } else if (oldFocusedSynoBirthOrder >= (childRefs(oldParent).length - 1)) {
              throw new Error('no next sibling');
            } else {
              newStagedNodeId = childRefs(oldParent)[oldFocusedSynoBirthOrder + 1].id;
            }
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
    case 'SET_FOCUS_SYNO': {
      const { synoId } = action;
      return synoId;
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
