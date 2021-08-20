import forChildSynoOf from '../../../syntree-utils/for-child-syno-of';
import getDraftSyno from '../draft-utils/get-draft-syno';

import type { StateSelector } from '../../../types/state-selector';
import type { ReplaceFocusedSyno } from '../../../types/actions/replace-focused-syno';
import type { MutableSynoMap } from '../../../types/syntactic/mutables/mutable-syno-map';
import type { MutableEditorState } from '../../../types/mutable-editor-state';
import type { SynoRef } from '../../../types/syntactic/syno-ref';
import type { Syno } from '../../../types/syntactic/syno';
import type { MutableSyntypeAttrs } from '../../../types/syntactic/mutables/mutable-syntype-attrs';
import type { SynoId } from '../../../types/syntactic/syno-id';
import type { UnistlikeEdit } from '../../../types/unistlike/unistlike-edit';

export default (
  state: StateSelector,
  action: ReplaceFocusedSyno,
  draftSynoMap: MutableSynoMap,
  draft: MutableEditorState,
  newSynoAttrs: MutableSyntypeAttrs,
  newSynoId: SynoId,
  latestEdit: UnistlikeEdit[],
): void => {
  const parentRef = state.focusedSyno().parent;
  let parentAttr: SynoRef | null;

  if (!parentRef) {
    parentAttr = null;
  } else {
    const parent: Syno = state.getSyno(parentRef.id);
    let childKey: string | null = null;
    let childIndex: number | null = null;
    forChildSynoOf(
      parent,
      (childRef: SynoRef, key: string, index: number | null) => {
        if (childRef.id === state.focusedSynoId()) {
          childKey = key;
          childIndex = index || null;
        }
      },
    );
    // should remove any uneeded (i.e., deleted) nodes from store
    const newParent = getDraftSyno(parent.id, state, draft);

    if (typeof childIndex === 'number' && typeof childKey === 'string') {
      (newParent[childKey] as Array<SynoRef>).splice(childIndex, 1, {
        synoRef: true,
        relation: 'child',
        id: newSynoId,
      });
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

  const newSyno: Syno = {
    id: newSynoId,
    parent: parentAttr,
    syntype: newSynoAttrs.syntype,
    value: newSynoAttrs.value,
  };

  if (Object.keys(draftSynoMap).includes(newSynoId)) {
    throw new Error('tried to create syno with in-use ID');
  }

  latestEdit.push({
    undo: {
      type: 'REPLACE_SYNO',
    },
    redo: {
      type: 'REPLACE_SYNO',
    },
  });

  draftSynoMap[newSynoId] = newSyno;
};
