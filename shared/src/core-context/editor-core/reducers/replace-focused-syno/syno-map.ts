import forChildSynoOf from '../../../../syntree-utils/for-child-syno-of';
import getDraftSyno from '../draft-utils/get-draft-syno';

import type { StateSelector } from '../../../../types/state-selector';
import type { ReplaceFocusedSyno } from '../../../../types/actions/replace-focused-syno';
import type { MutableSynoMap } from '../../../../types/syntactic/mutables/mutable-syno-map';
import type { MutableEditorState } from '../../../../types/mutable-editor-state';
import type { SynoRef } from '../../../../types/syntactic/syno-ref';
import type { Syno } from '../../../../types/syntactic/syno';
import type { MutableSyntypeAttrs } from '../../../../types/syntactic/mutables/mutable-syntype-attrs';
import type { SynoId } from '../../../../types/syntactic/syno-id';
import type { UnistlikeEdit } from '../../../../types/unistlike/unistlike-edit';

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

  let oldChildId: string | null = null;
  if (!parentRef) {
    parentAttr = null;
  } else {
    const parent: Syno = state.getSyno(parentRef.id);
    let childKey: string | null = null;
    let childIndex: number | null = null;
    forChildSynoOf(
      parent,
      (oldChildRef: SynoRef, key: string, index: number | null) => {
        if (oldChildRef.id === state.focusedSynoId()) {
          childKey = key;
          childIndex = index || null;
          oldChildId = oldChildRef.id;
        }
      },
    );

    const newParent = getDraftSyno(parent.id, state, draft);
    const newChildRef: SynoRef = {
      synoRef: true,
      relation: 'child',
      id: newSynoId,
    };

    if (typeof childIndex !== 'undefined' && typeof childKey === 'string') {
      (newParent[childKey] as Array<SynoRef>).splice(childIndex, 1, newChildRef);
    } else if (typeof childKey === 'string') {
      newParent[childKey] = newChildRef;
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

  if (parentAttr) {
    delete draftSynoMap[oldChildId];
    // TODO: recursively delete orphaned descendants
  }
  draftSynoMap[newSynoId] = newSyno;
};
