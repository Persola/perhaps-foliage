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

  // @ts-ignore: This isn't guaranteed because we don't validate nameHostRef vs. name in grammar
  draftSynoMap[textHostSyno.id].name =
    // @ts-ignore: This isn't guaranteed because we don't validate nameHostRef vs. name in grammar
    textHostSyno.name.slice(0, state.focusedCharIndex() - 1)
    // @ts-ignore: This isn't guaranteed because we don't validate nameHostRef vs. name in grammar
    + textHostSyno.name.slice(state.focusedCharIndex(), textHostSyno.name.length);
});