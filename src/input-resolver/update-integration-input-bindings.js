// @flow
import Mousetrap from 'mousetrap';

import type { StateSelector } from '../types/state-selector';

export default (
  state: StateSelector,
  inputResolver: string => void,
) => {
  if (state.lastIntegrationBindings()) {
    state.lastIntegrationBindings().forEach(input => Mousetrap.unbind(input));
  }

  Mousetrap.bind(
    Object.keys(state.keyToNewSynoAttrs()),
    (e, key) => inputResolver(key),
  );
};
