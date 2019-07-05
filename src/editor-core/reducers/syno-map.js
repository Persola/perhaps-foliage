// @flow
import verifyActionType from './util/verify-action-type'
import destroySyno from './syno-map/destroy-syno'
import dup from '../../syntree-utils/dup.js'

import type { Syno } from '../../types/syno'
import type { SynoMap } from '../../types/syno-map'
import type { BooleanLiteral } from '../../types/syntactic-nodes/boolean-literal'
import type { ReduxAction } from '../../types/redux-action'

export default (
  oldState: SynoMap,
  action: ReduxAction,
  inverseReferenceMap: InverseReferenceMap
): SynoMap => {
  const newSynoMap: SynoMap = dup(oldState);

  switch (action.type) {
    case 'REPLACE_FOCUSED_SYNO': {
      const { newSynoAttrs, newSynoId, focusedPresnoId } = action;

      const parentRef = oldState[focusedPresnoId].parent;
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
    case 'CHAR_BACKSPACE': {
      if (action.focusCharIndex === false) {
        console.warn('ignoring backspace command: not editing text');
        return oldState;
      }

      const focusSyno: Syno = newSynoMap[action.focusSynoId];

      let textHostSyno: Syno;
      if (['functionParameter', 'functionDefinition'].includes(focusSyno.syntype)) {
        textHostSyno = focusSyno;
      } else if (focusSyno.syntype === 'variableRef') {
        textHostSyno = newSynoMap[focusSyno.referent.id];
      } else if (focusSyno.syntype === 'argument') {
        textHostSyno = newSynoMap[focusSyno.parameter.id];
      } else {
        throw new Error('bad syntype in backspace');
      }

      textHostSyno.name = (
        textHostSyno.name.slice(0, action.focusCharIndex - 1) +
        textHostSyno.name.slice(action.focusCharIndex, textHostSyno.name.length)
      );

      return newSynoMap;
    }
    case 'DESTROY_FOCUSED_SYNO': {
      destroySyno(action, newSynoMap, oldState, inverseReferenceMap); // modifies newSynoMap
      return newSynoMap;
    }
    default: {
      verifyActionType(action.type);
      return oldState;
    }
  }
}
