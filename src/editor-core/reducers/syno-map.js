// @flow
import verifyActionType from './util/verify-action-type';
import destroySyno from './syno-map/destroy-syno';
import forChildSynoOf from '../../syntree-utils/for-child-syno-of.js';
import dup from '../../syntree-utils/dup.js';
import NorPrimitiveId from '../../extension-staging-area/saliva/nor-primitive-id.js';

import type { Syno } from '../../types/syno';
import type { MutableSyno } from '../../types/mutable-syno';
import type { SynoMap } from '../../types/syno-map';
import type { MutableSynoMap } from '../../types/mutable-syno-map';
import type { SynoRef } from '../../types/syno-ref';
import type { ReduxAction } from '../../types/redux-action';
import type { InverseReferenceMap } from '../../types/editor-state/inverse-reference-map';
import type { TextHostRefs } from '../../types/editor-state/text-host-refs';
import type { CoreSynoAttrs } from '../../extension-staging-area/saliva/types/synos/core-syno-attrs';
import type { MutableBooleanLiteral } from '../../extension-staging-area/saliva/types/synos/mutable-synos/boolean-literal';

export default (
  oldState: SynoMap,
  action: ReduxAction,
  inverseReferenceMap: InverseReferenceMap,
  textHostRefs: TextHostRefs,
): MutableSynoMap => {
  const newSynoMap: MutableSynoMap = dup(oldState);

  switch (action.type) {
    case 'REPLACE_FOCUSED_SYNO': {
      const { newSynoAttrs, newSynoId, focusedPresnoId } = action;
      const parentRef = oldState[focusedPresnoId].parent;

      let parentAttr: (SynoRef | false);
      if (!parentRef) {
        parentAttr = false;
      } else {
        const parent: Syno = oldState[parentRef.id];
        let childKey: (string | false) = false;
        let childIndex: (number | false) = false;
        forChildSynoOf(parent, (childRef: SynoRef, key: string, index: ?number) => {
          if (childRef.id === focusedPresnoId) {
            childKey = key;
            childIndex = index || false;
          }
        });
        // should remove any uneeded (i.e., deleted) nodes from store
        const newParent = newSynoMap[parent.id];

        if (
          typeof childIndex === 'number'
          && typeof childKey === 'string'
        ) {
          newParent[childKey].splice(
            childIndex,
            1,
            {
              synoRef: true,
              relation: 'child',
              id: newSynoId,
            },
          );
        } else if (typeof childKey === 'string') {
          newParent[childKey] = {
            synoRef: true,
            relation: 'child',
            id: newSynoId,
          };
        } else {
          throw new Error('syno had parent which did not have them as a child');
        }

        parentAttr = {
          synoRef: true,
          id: parentRef.id,
          relation: 'parent',
        };
      }

      const newSynoCoreAttrs: CoreSynoAttrs = {
        id: newSynoId,
        parent: parentAttr,
      };
      const newSyno: MutableBooleanLiteral = {
        id: newSynoCoreAttrs.id,
        parent: newSynoCoreAttrs.parent,
        syntype: newSynoAttrs.syntype,
        value: newSynoAttrs.value,
      };
      if (Object.keys(newSynoMap).includes(newSynoId)) {
        throw new Error('tried to create syno with in-use ID');
      }
      newSynoMap[newSynoId] = newSyno;

      return newSynoMap;
    }
    case 'END_INTERPRETATION': {
      const { result } = action;
      const mutableResult = ((result: any): MutableSyno);

      newSynoMap[mutableResult.id] = mutableResult;

      return newSynoMap;
    }
    case 'NAVIGATE': {
      return newSynoMap;
    }
    case 'SET_FOCUS_SYNO': {
      return newSynoMap;
    }
    case 'START_INTERPRETATION': {
      return newSynoMap;
    }
    case 'CHAR_BACKSPACE': {
      if (action.focusCharIndex === false) {
        console.warn('ignoring backspace command: not editing text');
        return newSynoMap;
      }

      const focusSyno: MutableSyno = newSynoMap[action.focusSynoId];

      let textHostSyno: MutableSyno;
      if (textHostRefs[focusSyno.syntype] === false) {
        textHostSyno = focusSyno;
      } else {
        const textHostSynoRef = textHostRefs[focusSyno.syntype];
        textHostSyno = newSynoMap[focusSyno[textHostSynoRef].id];
      }

      if (
        textHostSyno.syntype !== 'functionDefinition'
        && textHostSyno.syntype !== 'functionParameter'
      ) {
        throw new Error('text hosts refs lead to syno of wrong type? (flow)');
      }

      textHostSyno.name = (
        textHostSyno.name.slice(0, action.focusCharIndex - 1)
        + textHostSyno.name.slice(action.focusCharIndex, textHostSyno.name.length)
      );

      return newSynoMap;
    }
    case 'DESTROY_FOCUSED_SYNO': {
      const { focusedPresnoId } = action;
      if (
        oldState[focusedPresnoId].parent === false
        || focusedPresnoId === NorPrimitiveId
        || (
          oldState[focusedPresnoId].parent
          && oldState[focusedPresnoId].parent.id === NorPrimitiveId
        )
      ) {
        console.warn("ignoring syno detruction: can't destroy NOR primitive or children");
        return newSynoMap;
      }
      destroySyno(action, newSynoMap, oldState, inverseReferenceMap); // modifies newSynoMap
      return newSynoMap;
    }
    default: {
      verifyActionType(action.type);
      return newSynoMap;
    }
  }
};
