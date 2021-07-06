// @flow
import navOut from '../navigate/nav-out';
import NorPrimitiveId from '../../../extension-staging-area/saliva/nor-primitive-id.js';

import type { Focus } from '../../../types/editor-state/focus';
import type { DestroyFocusedSyno } from '../../../types/actions/destroy-focused-syno';
import type { SynoMap } from '../../../types/syno-map';

export default (
  oldFocus: Focus,
  action: DestroyFocusedSyno,
  oldSynoMap: SynoMap,
): Focus => {
  const { oldFocusedPresnoRef } = action;
  // needs parent and self, or their children ids

  if (action.oldFocusedPresnoRef.synoRef !== true) {
    throw new TypeError('DESTROY_FOCUSED_SYNO action recieved while not focused on syno level');
  }

  const oldFocusedPresno = oldSynoMap[action.oldFocusedPresnoRef.id];
  if (
    oldFocusedPresno.parent === false
    || oldFocusedPresno.id === NorPrimitiveId || (
      oldFocusedPresno.parent
      && oldFocusedPresno.parent.id === NorPrimitiveId
    )
  ) {
    console.warn("ignoring syno detruction: can't destroy NOR primitive or children");
    return oldFocus;
  }
  return navOut(oldFocus, oldSynoMap, oldFocusedPresnoRef);
};
