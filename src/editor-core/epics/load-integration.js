/*
  no flow because there's no types for rxjs in flow-typed that the current version of flow digests,
  let alone ones for an updated version of rxjs
*/
import { filter, map, mergeMap } from 'rxjs';

export default action$ => action$.pipe(
  filter(action => {
    return action.type === 'START_INTEGRATION_LOAD';
  }),
  mergeMap(action => {
    return action.file.text();
  }),
  map(integrationText => {
    // eval'd integration strings assign the integration object module to this variable name
    let newLanguageIntegration;
    // eslint-disable-next-line no-eval
    eval(integrationText);
    return {
      type: 'END_INTEGRATION_LOAD',
      newIntegrationAttrs: newLanguageIntegration.default,
    };
  }),
);
