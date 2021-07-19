// @flow
import type { StateSelector } from '../../types/state-selector';
import type { ReduxAction } from '../../types/redux-action';
import type { LanguageIntegration } from '../../types/language-integration';

export default (
  key: string,
  state: StateSelector,
  integration: LanguageIntegration,
): ReduxAction | false => {
  if (integration.keyToNewSynoAttrs === false) {
    return false;
  }

  if (Object.keys(integration.keyToNewSynoAttrs).includes(key)) {
    return ({
      type: 'REPLACE_FOCUSED_SYNO',
      input: key,
    });
  } if (key === 'backspace') {
    return ({
      type: 'DESTROY_FOCUSED_SYNO',
      focusedPresnoId: state.focusedSynoId(),
    });
  }
  return false;
};
