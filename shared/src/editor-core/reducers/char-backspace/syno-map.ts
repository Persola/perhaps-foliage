import type { StateSelector } from '../../../types/state-selector';
import type { MutableSynoMap } from '../../../types/syntactic/mutables/mutable-syno-map';
import type { Syno } from '../../../types/syntactic/syno';
import type { SynoRef } from '../../../types/syntactic/syno-ref';
import type { UnistlikeEdit } from '../../../types/unistlike/unistlike-edit';

export default (
  state: StateSelector,
  draftSynoMap: MutableSynoMap,
  latestEdit: UnistlikeEdit[],
): void => {
  const { textHostRef } = state.grammar()[state.focusedSyno().syntype];
  let textHostSyno: Syno;

  if (!textHostRef) {
    textHostSyno = state.focusedSyno();
  } else {
    const ref = state.focusedSyno()[textHostRef] as SynoRef;
    textHostSyno = state.getSyno(ref.id);
  }

  const newName = (
    // @ts-ignore: This isn't guaranteed because we don't validate nameHostRef vs. name in grammar
    textHostSyno.name.slice(0, state.focusedCharIndex() - 1)
    // @ts-ignore: This isn't guaranteed because we don't validate nameHostRef vs. name in grammar
    + textHostSyno.name.slice(state.focusedCharIndex(), textHostSyno.name.length)
  );

  latestEdit.push({
    undo: {
      type: 'UPDATE_NAME',
      // newName: textHostSyno.name,
    },
    redo: {
      type: 'UPDATE_NAME',
      // newName,
    },
  });

  // @ts-ignore: This isn't guaranteed because we don't validate nameHostRef vs. name in grammar
  draftSynoMap[textHostSyno.id].name = newName;
};
