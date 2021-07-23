import forChildSynoOf from "../../../syntree-utils/for-child-syno-of";
import getDraftSyno from "../draft-utils/get-draft-syno";
import type { StateSelector } from "../../../types/state-selector";
import type { ReplaceFocusedSyno } from "../../../types/actions/replace-focused-syno";
import type { MutableSynoMap } from "../../../types/mutable-syno-map";
import type { MutableEditorState } from "../../../types/mutable-editor-state";
import type { SynoRef } from "../../../types/syno-ref";
import type { Syno } from "../../../types/syno";
import type { SynoId } from "../../../types/syno-id";
import type { CoreSynoAttrs } from "../../../types/core-syno-attrs";
import type { MutableBooleanLiteral } from "../../../extension-staging-area/saliva/types/synos/mutable-synos/boolean-literal";
export default ((state: StateSelector, action: ReplaceFocusedSyno, draftSynoMap: MutableSynoMap, draft: MutableEditorState, newSynoAttrs: Record<string, any>, newSynoId: SynoId): void => {
  const parentRef = state.focusedSyno().parent;
  let parentAttr: SynoRef | null | undefined;

  if (!parentRef) {
    parentAttr = null;
  } else {
    const parent: Syno = state.getSyno(parentRef.id);
    let childKey: string | null | undefined = null;
    let childIndex: number | null | undefined = null;
    forChildSynoOf(parent, (childRef: SynoRef, key: string, index: number | null | undefined) => {
      if (childRef.id === state.focusedSynoId()) {
        childKey = key;
        childIndex = index || null;
      }
    });
    // should remove any uneeded (i.e., deleted) nodes from store
    const newParent = getDraftSyno(parent.id, state, draft);

    if (typeof childIndex === 'number' && typeof childKey === 'string') {
      newParent[childKey].splice(childIndex, 1, {
        synoRef: true,
        relation: 'child',
        id: newSynoId
      });
    } else if (typeof childKey === 'string') {
      newParent[childKey] = {
        synoRef: true,
        relation: 'child',
        id: newSynoId
      };
    } else {
      throw new Error('syno had parent which did not have them as a child');
    }

    parentAttr = {
      synoRef: true,
      id: parentRef.id,
      relation: 'parent'
    };
  }

  const newSynoCoreAttrs: CoreSynoAttrs = {
    id: newSynoId,
    parent: parentAttr
  };
  const newSyno: MutableBooleanLiteral = {
    id: newSynoCoreAttrs.id,
    parent: newSynoCoreAttrs.parent,
    syntype: newSynoAttrs.syntype,
    value: newSynoAttrs.value
  };

  if (Object.keys(draftSynoMap).includes(newSynoId)) {
    throw new Error('tried to create syno with in-use ID');
  }

  draftSynoMap[newSynoId] = newSyno;
});