import type { StateSelector } from '../../../../types/state-selector';
import type { MutableFocus } from '../../../../types/editor-state/mutable/mutable-focus';

export default (
  state: StateSelector,
  draftFocus: MutableFocus,
): void => {
  const oldSyno = state.focusedSyno();
  const nameHostRefName: string | null = state.grammar()[oldSyno.syntype].textHostRef;
  let oldName: string;

  if (!nameHostRefName) {
    // @ts-ignore: This isn't guaranteed because we don't validate nameHostRef vs. name in grammar
    oldName = oldSyno.name;
  } else {
    if (!oldSyno[nameHostRefName]) {
      throw new Error(
        'We seem to be focused on a name presno that depends on an incomplete ref',
      );
    }

    // @ts-ignore: This isn't guaranteed because we don't validate nameHostRef vs. name in grammar
    oldName = state.getSyno(oldSyno[nameHostRefName].id).name;
  }

  const nameLength: number = oldName.length;

  if (state.focusedCharIndex() > nameLength) {
    console.warn(
      'Ignoring navigation to previous sibling: already on last character',
    );
    return;
  }

  draftFocus.charIndex += 1;
};
