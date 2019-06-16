// @flow
import type { Focus } from '../../../../types/editor-state/focus'
import type { ChildPresnoRef } from '../../../../types/child-presno-ref'
import type { SynoMap } from '../../../../types/syno-map'

export default (
  oldFocusedPresnoRef: ChildPresnoRef,
  synoMap: SynoMap,
  oldState: Focus
): Focus => {
  if (oldFocusedPresnoRef.synoRef) {
    const oldFocusedPresno = synoMap[oldFocusedPresnoRef.id];
    if (oldFocusedPresno.parent === false) {
      console.warn('ignoring navigation outwards: no parent');
      return oldState;
    }
    return {
      synoId: oldFocusedPresno.parent.id,
      presnoIndex: false,
      charIndex: false
    };
  } else {
    if (oldState.charIndex ===  false) {
      return {
        synoId: oldState.synoId,
        presnoIndex: false,
        charIndex: false
      };      
    } else {
      return {
        synoId: oldState.synoId,
        presnoIndex: oldState.presnoIndex,
        charIndex: false
      };
    }
  }
}
