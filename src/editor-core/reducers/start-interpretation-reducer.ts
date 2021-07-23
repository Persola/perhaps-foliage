// @flow
import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { StateSelector } from '../../types/state-selector';
import type { LanguageIntegration } from '../../types/language-integration';

export default (
  state: StateSelector,
  draftState: MutableEditorState,
  integration: LanguageIntegration,
): void => {
  if (state.integrationLoaded() === false) {
    console.warn('Ignoring START_INTEGRATION action: no integration loaded');
    return;
  }

  if (state.treeLoaded() === false) {
    console.warn('Ignoring START_INTEGRATION action: no tree loaded');
    return;
  }

  if (!integration.interpret) {
    console.warn('Ignoring START_INTERPRETATION action: integration lacks interpreter');
    return;
  }

  if (state.interpreting()) {
    throw new Error('attempted to interpret while already interpreting');
  }

  draftState.interpreting = true;
};
