import type { SynoId } from '../../../../types/syntactic/syno-id';
import type { StateSelector } from '../../../../types/state-selector';
import type { MutableEditorState } from '../../../../types/editor-state/mutable/mutable-editor-state';
import type { MutableSyno } from '../../../../types/syntactic/mutables/mutable-syno';

export default (
  synoId: SynoId,
  state: StateSelector,
  draft: MutableEditorState,
): MutableSyno => {
  if (!state.primitives()) {
    throw new Error('Tried to fetch draft syno with no language loaded');
  }

  if (!state.synoMap()) {
    throw new Error('Tried to fetch draft syno with no tree loaded');
  }

  let maybeSyno;
  let isPrimitive: void | boolean;
  maybeSyno = state.synoMap()[synoId];

  if (maybeSyno) {
    isPrimitive = false;
  } else {
    maybeSyno = state.primitives()[synoId];

    if (maybeSyno) {
      isPrimitive = true;
    }
  }

  if (!maybeSyno) {
    throw new TypeError(`cannot find syno with ID '${synoId}'`);
  }

  return isPrimitive ? draft.primitives[synoId] : draft.synoMap[synoId];
};
