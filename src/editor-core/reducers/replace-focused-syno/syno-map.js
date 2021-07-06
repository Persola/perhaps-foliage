// @flow
import forChildSynoOf from '../../../syntree-utils/for-child-syno-of';
import mutateSynoMap from '../state-slice-helpers/syno-map/mutate-syno-map';

import type { SynoMap } from '../../../types/syno-map';
import type { ReplaceFocusedSyno } from '../../../types/actions/replace-focused-syno';
import type { MutableSynoMap } from '../../../types/mutable-syno-map';
import type { SynoRef } from '../../../types/syno-ref';
import type { Syno } from '../../../types/syno';
import type { CoreSynoAttrs } from '../../../extension-staging-area/saliva/types/synos/core-syno-attrs';
import type { MutableBooleanLiteral } from '../../../extension-staging-area/saliva/types/synos/mutable-synos/boolean-literal';

export default (
  oldSynoMap: SynoMap,
  action: ReplaceFocusedSyno,
): SynoMap => {
  return mutateSynoMap(oldSynoMap, (newSynoMap: MutableSynoMap) => {
    const { newSynoAttrs, newSynoId, focusedPresnoId } = action;
    const parentRef = oldSynoMap[focusedPresnoId].parent;

    let parentAttr: (SynoRef | false);
    if (!parentRef) {
      parentAttr = false;
    } else {
      const parent: Syno = oldSynoMap[parentRef.id];
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
  });
};
