// @flow
import type { SynoId } from '../../../types/syno-id';
import type { StateSelector } from '../../../types/state-selector';
import type { MutableEditorState } from '../../../types/mutable-editor-state';
import type { MutableSyno } from '../../../types/mutable-syno';

export default (
  synoId: SynoId,
  state: StateSelector,
  draft: MutableEditorState,
): MutableSyno => {
  let maybeSyno;
  let isPrimitive: (void | boolean);
  maybeSyno = state.synoMap()[synoId];
  if (maybeSyno) {
    isPrimitive = false;
  } else {
    maybeSyno = state.primitives()[synoId];
    if (maybeSyno) {
      isPrimitive = false;
    }
  }
  if (!maybeSyno) {
    throw new TypeError(`cannot find syno with ID '${synoId}'`);
  }
  return isPrimitive ? draft.primitives[synoId] : draft.synoMap[synoId];
};
