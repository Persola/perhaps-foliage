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
      throw new Error('navigate failed; no parent!');
    }
    return {
      synoId: oldFocusedPresno.parent.id,
      presnoIndex: false,
      charIndex: false
    };
  } else {
    // assumes presnos are one level deep
    return {
      synoId: oldState.synoId,
      presnoIndex: false,
      charIndex: false
    };
  }
}
