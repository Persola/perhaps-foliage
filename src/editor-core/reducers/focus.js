// @flow
import verifyActionType from './verify-action-type'
import type { Focus } from '../../types/editor-state/focus'
import type { Syno } from '../../types/syno'
import type { SynoRef } from '../../types/syno-ref'
import type { SynoMap } from '../../types/syno-map'
import type { ReduxAction } from '../../types/redux-action'

const childRefs = (syno: Syno, synoMap: SynoMap): SynoRef[] => {
  switch (syno.syntype) {
    case 'functionCall': {
      const childRefs: SynoRef[] = syno.argumentz.slice();
      const calleeSyno = synoMap[syno.callee.id];
      if (calleeSyno.syntype === 'functionDefinition') {
        childRefs.push(syno.callee);
      }
      return childRefs;
    }
    case 'functionDefinition': {
      const childRefs = syno.parameters.slice();
      childRefs.push(syno.body);
      return childRefs;
    }
    case 'argument': {
      return [syno.value];
    }
    default: {
      return [];
    }
  }
};

export default (oldState: Focus, action: ReduxAction, synoMap: SynoMap): Focus => {
  switch (action.type) {
    case 'REPLACE_FOCUSED_NODE': {
      return {
        synoId: action.newSynoId,
        presnoIndex: false,
        charIndex: false
      };
    }
    case 'END_INTERPRETATION': {
      return oldState;
    }
    case 'NAVIGATE': {
      // needs parent and self, or their children ids
      const { direction, oldFocusedPresno, oldParent } = action;
      let newStagedNodeId;

      switch (direction) {
        case 'out': {
          if (!oldParent) { throw new Error('navigate failed; no parent!'); }
          newStagedNodeId = oldParent.id;
          break;
        }
        case 'in': {
          if (childRefs(oldFocusedPresno, synoMap).length > 0) {
            newStagedNodeId = childRefs(oldFocusedPresno, synoMap)[0].id;
          } else {
            throw new Error('navigate failed; no children!');
          }
          break;
        }
        case 'prev': {
          if (!oldParent) { throw new Error('navigate failed; no parent!'); }
          const childRefz = childRefs(oldParent, synoMap);
          if (childRefz.length > 0) {
            const oldFocusedPresnoBirthOrder = childRefz.findIndex(childRef => {
              return childRef.id === oldState.synoId;
            });
            if (oldFocusedPresnoBirthOrder === -1) {
              throw new Error("cannot find old focused presno ID among parent's children");
            } else if (oldFocusedPresnoBirthOrder === 0) {
              throw new Error('no previous sibling');
            } else {
              newStagedNodeId = childRefz[oldFocusedPresnoBirthOrder - 1].id;
            }
          } else {
            throw new Error('navigate failed; no argumentz!');
          }
          break;
        }
        case 'next': {
          if (!oldParent) { throw new Error('navigate failed; no parent!'); }
          const childRefz = childRefs(oldParent, synoMap);
          if (childRefz.length > 0) {
            const oldFocusedPresnoBirthOrder = childRefz.findIndex(childRef => {
              return childRef.id === oldState.synoId;
            });
            if (oldFocusedPresnoBirthOrder === -1) {
              throw new Error("cannot find old focused presno ID among parent's children");
            } else if (oldFocusedPresnoBirthOrder >= (childRefz.length - 1)) {
              throw new Error('no next sibling');
            } else {
              newStagedNodeId = childRefz[oldFocusedPresnoBirthOrder + 1].id;
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

      return {
        synoId: newStagedNodeId,
        presnoIndex: false,
        charIndex: false
      };
    }
    case 'SET_FOCUS_SYNO': {
      const { synoId } = action;
      return {
        synoId: synoId,
        presnoIndex: false,
        charIndex: false
      };
    }
    case 'START_INTERPRETATION': {
      return oldState;
    }
    default: {
      verifyActionType(action.type);
      return oldState;
    }
  }
}
