import { Observable, filter, map } from 'rxjs';

import type { Action } from 'redux';

import type { MainsideLanguageIntegration } from '../../../types/language-integration/mainside-language-integration';
import type { StartIntegrationHotload } from '../../../types/actions/start-integration-hotload';
import type { EndIntegrationHotload } from '../../../types/actions/end-integration-hotload';

export default (
  action$: Observable<Action>,
): Observable<EndIntegrationHotload> => action$.pipe(
  filter((action: Action) => {
    return action.type === 'START_INTEGRATION_HOTLOAD';
  }),
  map((action: StartIntegrationHotload) => {
  // eval'd integration strings assign the integration object module to this variable name
    let initializeIntegration: {
      default: MainsideLanguageIntegration
    };
    // eslint-disable-next-line no-eval
    eval(action.fileText);
    return {
      type: 'END_INTEGRATION_LOAD',
      newIntegrationAttrs: initializeIntegration.default,
    };
  }),
);
