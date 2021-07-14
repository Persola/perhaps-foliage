// @flow
import type { StateSelector } from '../../../types/state-selector';
import type { MutableSynoMap } from '../../../types/mutable-syno-map';
import type { CharBackspace } from '../../../types/actions/char-backspace';
import type { Syno } from '../../../types/syno';

export default (
  state: StateSelector,
  action: CharBackspace,
  draftState: MutableSynoMap,
): void => {
  const textHostRef = state.textHostRefs()[state.focusedSyno().syntype];
  let textHostSyno: Syno;
  if (textHostRef === false) {
    textHostSyno = state.focusedSyno();
  } else {
    // $FlowFixMe: Flow doesn't look into selector interface
    textHostSyno = state.getSyno(
      state.focusedSyno()[textHostRef].id,
    );
  }

  if (
    textHostSyno.syntype !== 'functionDefinition'
    && textHostSyno.syntype !== 'functionParameter'
  ) {
    throw new Error('text hosts refs lead to syno of wrong type? (flow)');
  }

  // $FlowFixMe: Flow doesn't know draftState matches old state
  draftState[textHostSyno.id].name = (
    // $FlowFixMe: Flow doesn't know draftState matches old state
    textHostSyno.name.slice(0, state.focusedCharIndex() - 1)
    // $FlowFixMe: Flow doesn't know draftState matches old state
    + textHostSyno.name.slice(state.focusedCharIndex(), textHostSyno.name.length)
  );
};
