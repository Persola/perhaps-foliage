// @flow
import verifyActionType from './util/verify-action-type'
import type { Focus } from '../../types/editor-state/focus'
import type { Syno } from '../../types/syno'
import type { ChildPresnoRef } from '../../types/child-presno-ref'
import type { SynoMap } from '../../types/syno-map'
import type { ReduxAction } from '../../types/redux-action'

const childRefs = (syno: Syno, synoMap: SynoMap): ChildPresnoRef[] => {
  switch (syno.syntype) {
    case 'functionCall': {
      const childRefs: ChildPresnoRef[] = [...syno.argumentz];
      const calleeSyno = synoMap[syno.callee.id];
      if (calleeSyno.syntype === 'functionDefinition') {
        childRefs.push(syno.callee);
      }
      return childRefs
    }
    case 'functionDefinition': {
      const childRefs: ChildPresnoRef[] = [
        { // the name first
          synoRef: false,
          parent: {
            synoRef: true,
            id: syno.id
          },
          index: 0
        },
        ...syno.parameters,
        syno.body
      ];
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
    case 'REPLACE_FOCUSED_SYNO': {
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
      const { direction, oldFocusedPresnoRef } = action;

      let oldParent;
      if (oldFocusedPresnoRef.synoRef) {
        const oldFocusedPresno = synoMap[oldFocusedPresnoRef.id];
        oldParent = oldFocusedPresno.parent && synoMap[oldFocusedPresno.parent.id];
      } else {
        oldParent = synoMap[oldFocusedPresnoRef.parent.id];
      }

      switch (direction) {
        case 'out': {
          if (oldFocusedPresnoRef.synoRef) {
            const oldFocusedPresno = synoMap[oldFocusedPresnoRef.id];
            if (oldFocusedPresno.parent === false) { throw new Error('navigate failed; no parent!'); }
            return {
              synoId: oldFocusedPresno.parent.id,
              presnoIndex: false,
              charIndex: false
            };
          } else {
            return {
              synoId: oldState.synoId,
              presnoIndex: false,
              charIndex: false
            };
          }
        }
        case 'in': {
          if (!oldFocusedPresnoRef.synoRef) { throw new Error('tried to go inside name') }
          const oldFocusedPresno: Syno = synoMap[oldFocusedPresnoRef.id];
          if (childRefs(oldFocusedPresno, synoMap).length > 0) {
            const newFocusPresnoRef: ChildPresnoRef = childRefs(oldFocusedPresno, synoMap)[0];

            if (newFocusPresnoRef.synoRef) {
              return {
                synoId: newFocusPresnoRef.id,
                presnoIndex: false,
                charIndex: false
              };
            } else {
              return {
                synoId: oldFocusedPresno.id,
                presnoIndex: 0,
                charIndex: false
              };
            }
          } else {
            throw new Error('navigate failed; no children!');
          }
        }
        case 'prev': {
          if (!oldParent) { throw new Error('navigate failed; no parent!'); }
          const siblingRefz = childRefs(oldParent, synoMap);
          if (siblingRefz.length > 0) {
            const oldFocusedPresnoBirthOrder = siblingRefz.findIndex(siblingRef => {
              if (siblingRef.synoRef) {
                // $FlowFixMe (Flow's disjoint union refinement is like that of a little baby)
                return siblingRef.id === oldFocusedPresnoRef.id;
              } else {
                // $FlowFixMe (Flow's disjoint union refinement is like that of a little baby)
                return siblingRef.index === oldFocusedPresnoRef.index;
              }
            });
            if (oldFocusedPresnoBirthOrder === -1) {
              throw new Error("cannot find old focused presno ID among parent's children");
            } else if (oldFocusedPresnoBirthOrder === 0) {
              throw new Error('no previous sibling');
            } else {
              const newFocusPresnoRef: ChildPresnoRef = siblingRefz[oldFocusedPresnoBirthOrder - 1];

              if (newFocusPresnoRef.synoRef) {
                return {
                  synoId: newFocusPresnoRef.id,
                  presnoIndex: false,
                  charIndex: false
                };
              } else {
                return {
                  synoId: oldParent.id,
                  presnoIndex: 0,
                  charIndex: false
                };
              }
            }
          } else {
            throw new Error('navigate failed; parent has no children!?');
          }
        }
        case 'next': {
          if (!oldParent) { throw new Error('navigate failed; no parent!'); }
          const siblingRefz = childRefs(oldParent, synoMap);
          if (siblingRefz.length > 0) {
            const oldFocusedPresnoBirthOrder = siblingRefz.findIndex(siblingRef => {
              if (siblingRef.synoRef) {
                // $FlowFixMe (Flow's disjoint union refinement is like that of a little baby)
                return siblingRef.id === oldFocusedPresnoRef.id;
              } else {
                // $FlowFixMe (Flow's disjoint union refinement is like that of a little baby)
                return siblingRef.index === oldFocusedPresnoRef.index;
              }
            });
            if (oldFocusedPresnoBirthOrder === -1) {
              throw new Error("cannot find old focused presno ID among parent's children");
            } else if (oldFocusedPresnoBirthOrder >= (siblingRefz.length - 1)) {
              throw new Error('no next sibling');
            } else {
              const newFocusPresnoRef = siblingRefz[oldFocusedPresnoBirthOrder + 1];

              if (newFocusPresnoRef.synoRef) {
                return {
                  synoId: newFocusPresnoRef.id,
                  presnoIndex: false,
                  charIndex: false
                };
              } else {
                return {
                  synoId: oldParent.id,
                  presnoIndex: 0,
                  charIndex: false
                };
              }
            }
          } else {
            throw new Error('navigate failed; parent has no children!?');
          }
        }
        default: {
          throw new Error('unrecognized navigation direction');
        }
      }
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
