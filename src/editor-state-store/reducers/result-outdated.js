// @flow
import type { resultOutdated } from '../../types/editor-state/result-outdated'
import type { reduxAction } from '../../types/redux-action'

export default (oldState: resultOutdated, action: reduxAction): resultOutdated => {
  switch (action.type) {
    case 'REPLACE_FOCUSED_NODE':
      return true;
    case 'UPDATE_RESULT':
      return false;
    case 'NAVIGATE':
      return oldState;
    case '@@redux/INIT':
      return oldState;
    default:
      throw new Error(`Unrecognized action type: '${action.type}'`);
  }
}
