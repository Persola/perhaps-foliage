import StateMutator from '../../mutators/state-mutator';

import type { Warn } from '../../../types/cross-context/warn';

export default (
  state: StateMutator,
  warnUser: Warn,
): void => {
  if (state.integrationLoaded() === false) {
    warnUser('Ignoring START_SYNTREE_LOAD action: no integration loaded');
    return;
  }

  state.state.loadingSyntree = true;
};
