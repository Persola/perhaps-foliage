import presentTree from './present-tree';

import type { StateSelector } from '../../types/state-selector';
import type { EditorPresentation } from '../../types/presenter/editor-presentation';
import type { MainsideLangInt } from '../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { MainsidePresentLangInt } from '../../types/language-integration/interfaces/mainside/mainside-present-lang-int';

const generatePresentation = (
  state: StateSelector,
  integration: MainsideLangInt,
): EditorPresentation => {
  const focus = state.focus();
  let stage;

  if (
    !state.integrationLoaded()
    || !state.editeeTree()
    || !state.focusedSynoId()
  ) {
    stage = null;
  } else {
    stage = presentTree(
      state,
      integration as MainsidePresentLangInt,
      state.editeeTree().rootId,
      focus,
    );
  }

  let result;

  if (!state.resultTree()) {
    result = null;
  } else {
    result = presentTree(
      state,
      integration as MainsidePresentLangInt,
      state.resultTree().rootId,
      null,
    );
  }

  return {
    stage,
    result,
  };
};

export default (
  state: StateSelector,
  integration: MainsideLangInt,
): (
  () => EditorPresentation
) => {
  // eslint-disable-line function-paren-newline
  return () => {
    return generatePresentation(state, integration);
  };
};
