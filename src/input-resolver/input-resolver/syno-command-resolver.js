// @flow
import type { StateSelector } from '../../types/state-selector';
import type { ReduxAction } from '../../types/redux-action';
import type { KeyToNewSynoAttrs } from '../../types/language-integration/key-to-new-syno-attrs';

export default (
  key: string,
  state: StateSelector,
  salivaKeyToNewSynoAttrs: KeyToNewSynoAttrs,
): ReduxAction | false => {
  if (Object.keys(salivaKeyToNewSynoAttrs).includes(key)) {
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
