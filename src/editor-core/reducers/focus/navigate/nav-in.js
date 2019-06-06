// @flow
import getChildPresnoRefs from './get-child-presno-refs'
import type { Focus } from '../../../../types/editor-state/focus'
import type { ChildPresnoRef } from '../../../../types/child-presno-ref'
import type { SynoMap } from '../../../../types/syno-map'
import type { Syno } from '../../../../types/syno'

export default (
  oldFocusedPresnoRef: ChildPresnoRef,
  synoMap: SynoMap
): Focus => {
  if (!oldFocusedPresnoRef.synoRef) { throw new Error('tried to go inside name') }
  const oldFocusedPresno: Syno = synoMap[oldFocusedPresnoRef.id];
  if (getChildPresnoRefs(oldFocusedPresno, synoMap).length > 0) {
    const newFocusPresnoRef: ChildPresnoRef = getChildPresnoRefs(oldFocusedPresno, synoMap)[0];

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
