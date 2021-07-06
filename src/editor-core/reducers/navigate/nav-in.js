// @flow
import getChildPresnoRefs from './get-child-presno-refs';

import type { Focus } from '../../../types/editor-state/focus';
import type { GrammarName } from '../../../types/editor-state/grammar-name';
import type { SynoMap } from '../../../types/syno-map';
import type { ChildPresnoRef } from '../../../types/child-presno-ref';
import type { Syno } from '../../../types/syno';

export default (
  oldFocus: Focus,
  grammarName: GrammarName,
  synoMap: SynoMap,
  oldFocusedPresnoRef: ChildPresnoRef,
): Focus => {
  if (!oldFocusedPresnoRef.synoRef) {
    if (oldFocus.charIndex !== false) {
      console.warn('cannot navigate down: editing text');
      return oldFocus;
    }

    return {
      synoId: oldFocus.synoId,
      presnoIndex: oldFocus.presnoIndex,
      charIndex: 0, // enter beginning of name
    };
  }

  const oldFocusedPresno: Syno = synoMap[oldFocusedPresnoRef.id];

  if (getChildPresnoRefs(oldFocusedPresno, synoMap, grammarName).length === 0) {
    console.warn('ignoring navigation inwards: no children');
    return oldFocus;
  }
  const newFocusPresnoRef: ChildPresnoRef = getChildPresnoRefs(
    oldFocusedPresno,
    synoMap,
    grammarName,
  )[0];

  if (newFocusPresnoRef.synoRef) {
    return {
      synoId: newFocusPresnoRef.id,
      presnoIndex: false,
      charIndex: false,
    };
  }
  return {
    synoId: oldFocusedPresno.id,
    presnoIndex: 0,
    charIndex: false,
  };
};
