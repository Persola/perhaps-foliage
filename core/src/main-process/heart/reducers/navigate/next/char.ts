import type { StateSelector } from '../../../../../types/state-selector';
import type { MutableFocus } from '../../../../../types/editor-state/mutable/mutable-focus';
import type { Warn } from '../../../../../types/cross-context/warn';

export default (
  state: StateSelector,
  draftFocus: MutableFocus,
  warnUser: Warn,
): void => {
  const oldSyno = state.focusedSyno();
  const nameHostName: string | null = state.syntypeSchema()[oldSyno.syntype].nonTreeRefs.textHost;

  let oldName: string;
  if (!nameHostName) {
    // @ts-ignore: This isn't guaranteed because we don't validate nameHostRef vs. name in grammar
    oldName = oldSyno.name;
  } else {
    if (!oldSyno[nameHostName]) {
      throw new Error(
        'We seem to be focused on a name presno that depends on an incomplete ref',
      );
    }

    // @ts-ignore: This isn't guaranteed because we don't validate nameHostRef vs. name in grammar
    oldName = state.getSyno(oldSyno[nameHostRefName].id).name;
  }

  const nameLength: number = oldName.length;

  if (state.focusedCharIndex() > nameLength) {
    warnUser('Ignoring navigation to previous sibling: already on last character');
    return;
  }

  draftFocus.charIndex += 1;
};
