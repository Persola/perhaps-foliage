import { Observable, filter, map } from 'rxjs';

import type { Action } from 'redux';

import type { IntegrationDependencies } from '../../../types/language-integration/integration-dependencies';
import type { CoresideLanguageIntegration } from '../../../types/language-integration/coreside-language-integration';
import type { StartIntegrationLoad } from '../../../types/actions/start-integration-load';

export default (
  action$: Observable<Action>,
  integrationDependencies: IntegrationDependencies,
) => action$.pipe(
  filter((action: Action) => {
    return action.type === 'START_INTEGRATION_LOAD';
  }),
  map((action: StartIntegrationLoad) => {
  // eval'd integration strings assign the integration object module to this variable name
    let initializeIntegration: {
      default: (id: IntegrationDependencies) => CoresideLanguageIntegration
    };
    // eslint-disable-next-line no-eval
    eval(action.fileText);
    return {
      type: 'END_INTEGRATION_LOAD',
      newIntegrationAttrs: initializeIntegration.default(
        integrationDependencies,
      ),
    };
  }),
);
