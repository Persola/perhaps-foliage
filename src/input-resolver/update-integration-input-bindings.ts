import Mousetrap from "mousetrap";
import type { StateSelector } from "../types/state-selector";
export default ((state: StateSelector, inputResolver: (arg0: string) => void) => {
  if (state.lastIntegrationBindings()) {
    state.lastIntegrationBindings().forEach(input => Mousetrap.unbind(input));
  }

  if (state.keyToNewSynoAttrs()) {
    Mousetrap.bind(Object.keys(state.keyToNewSynoAttrs()), (e, key) => inputResolver(key));
  }
});