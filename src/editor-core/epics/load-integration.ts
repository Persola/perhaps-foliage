import { Observable, filter, map, mergeMap } from 'rxjs';

import type { Action } from 'redux';

import type { IntegrationDependencies } from '../../types/language-integration/integration-dependencies';
import type { StartIntegrationLoad } from '../../types/actions/start-integration-load';

export default (
  action$: Observable<Action>,
  integrationDependencies: IntegrationDependencies,
) => action$.pipe(
  filter((action: Action) => {
    return action.type === 'START_INTEGRATION_LOAD';
  }),
  mergeMap((action: StartIntegrationLoad) => {
    return action.file.text();
  }),
  map((integrationText: string) => {
  // eval'd integration strings assign the integration object module to this variable name
    let initializeIntegration;
    // eslint-disable-next-line no-eval
    eval(integrationText);
    return {
      type: 'END_INTEGRATION_LOAD',
      newIntegrationAttrs: initializeIntegration.default(
        integrationDependencies,
      ),
    };
  }),
);
