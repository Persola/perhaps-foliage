import type { StateSelector } from '../../../types/state-selector';
import type { ReplaceFocusedSyno } from '../../../types/actions/replace-focused-syno';
import type { DestroyFocusedSyno } from '../../../types/actions/destroy-focused-syno';
import type { MainsideLanguageIntegration } from '../../../types/language-integration/mainside-language-integration';

export default (
  input: string,
  state: StateSelector,
  integration: MainsideLanguageIntegration,
): (
  | ReplaceFocusedSyno
  | DestroyFocusedSyno
  | null
) => {
  if (!integration.keyToNewSynoAttrs) {
    return null;
  }

  if (Object.keys(integration.keyToNewSynoAttrs).includes(input)) {
    return {
      type: 'REPLACE_FOCUSED_SYNO',
      input,
    };
  }

  if (input === 'backspace') {
    return {
      type: 'DESTROY_FOCUSED_SYNO',
      focusedPresnoId: state.focusedSynoId(),
    };
  }

  return null;
};
