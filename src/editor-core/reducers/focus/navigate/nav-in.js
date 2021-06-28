// @flow
import getChildPresnoRefs from './get-child-presno-refs';
import type { Focus } from '../../../../types/editor-state/focus';
import type { ChildPresnoRef } from '../../../../types/child-presno-ref';
import type { SynoMap } from '../../../../types/syno-map';
import type { Syno } from '../../../../types/syno';
import type { GrammarName } from '../../../../types/editor-state/grammar-name';

export default (
  oldFocusedPresnoRef: ChildPresnoRef,
  synoMap: SynoMap,
  oldState: Focus,
  grammarName: GrammarName,
): Focus => {
  if (!oldFocusedPresnoRef.synoRef) {
    if (oldState.charIndex !== false) {
      console.warn('cannot navigate down: editing text');
      return oldState;
    }

    return {
      synoId: oldState.synoId,
      presnoIndex: oldState.presnoIndex,
      charIndex: 0, // enter beginning of name
    };
  }

  const oldFocusedPresno: Syno = synoMap[oldFocusedPresnoRef.id];

  if (getChildPresnoRefs(oldFocusedPresno, synoMap, grammarName).length === 0) {
    console.warn('ignoring navigation inwards: no children');
    return oldState;
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
