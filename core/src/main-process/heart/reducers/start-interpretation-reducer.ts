import StateSelector from '../../selectors/state-selector';
import StateMutator from '../../mutators/state-mutator';

import type { MainsideLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { Warn } from '../../../types/cross-context/warn';

export default (
  readState: StateSelector,
  writeState: StateMutator,
  integration: MainsideLangInt,
  warnUser: Warn,
): void => {
  if (readState.integrationLoaded() === false) {
    warnUser('Ignoring START_INTEGRATION action: no integration loaded');
    return;
  }

  if (readState.treeLoaded() === false) {
    warnUser('Ignoring START_INTEGRATION action: no tree loaded');
    return;
  }

  if (!integration.interpret) {
    warnUser('Ignoring START_INTERPRETATION action: integration lacks interpreter');
    return;
  }

  if (readState.interpreting()) {
    throw new Error('Attempted to interpret while already interpreting');
  }

  writeState.state.interpreting = true;
};
