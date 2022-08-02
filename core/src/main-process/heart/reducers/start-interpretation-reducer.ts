import type { MutableEditorState } from '../../../types/mutable-editor-state';
import type { StateSelector } from '../../../types/state-selector';
import type { MainsideLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { Warn } from '../../../types/cross-context/warn';

export default (
  state: StateSelector,
  draftState: MutableEditorState,
  integration: MainsideLangInt,
  warnUser: Warn,
): void => {
  if (state.integrationLoaded() === false) {
    warnUser('Ignoring START_INTEGRATION action: no integration loaded');
    return;
  }

  if (state.treeLoaded() === false) {
    warnUser('Ignoring START_INTEGRATION action: no tree loaded');
    return;
  }

  if (!integration.interpret) {
    warnUser('Ignoring START_INTERPRETATION action: integration lacks interpreter');
    return;
  }

  if (state.interpreting()) {
    throw new Error('attempted to interpret while already interpreting');
  }

  draftState.interpreting = true;
};
