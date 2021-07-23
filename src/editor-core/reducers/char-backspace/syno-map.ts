import type { StateSelector } from "../../../types/state-selector";
import type { MutableSynoMap } from "../../../types/mutable-syno-map";
import type { Syno } from "../../../types/syno";
export default ((state: StateSelector, draftSynoMap: MutableSynoMap): void => {
  const {
    textHostRef
  } = state.grammar()[state.focusedSyno().syntype];
  let textHostSyno: Syno;

  if (!textHostRef) {
    textHostSyno = state.focusedSyno();
  } else {
    // $FlowFixMe: Flow doesn't look into selector interface
    textHostSyno = state.getSyno(state.focusedSyno()[textHostRef].id);
  }

  // $FlowFixMe: Flow doesn't know draft state matches old state
  draftSynoMap[textHostSyno.id].name = // $FlowFixMe: Flow doesn't know draft state matches old state
  textHostSyno.name.slice(0, state.focusedCharIndex() - 1) // $FlowFixMe: Flow doesn't know draft state matches old state
  + textHostSyno.name.slice(state.focusedCharIndex(), textHostSyno.name.length);
});