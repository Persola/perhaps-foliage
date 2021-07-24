/*
  no flow because there's no types for rxjs in flow-typed that the current version of flow digests,
  let alone ones for an updated version of rxjs
*/
import { filter, map, mergeMap } from "rxjs";
import type { ReduxAction } from "../../types/redux-action";
import type { StartIntegrationLoad } from "../../types/actions/start-integration-load";
export default (action$, integrationDependencies) =>
  action$.pipe(
    filter((action: ReduxAction) => {
      return action.type === "START_INTEGRATION_LOAD";
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
        type: "END_INTEGRATION_LOAD",
        newIntegrationAttrs: initializeIntegration.default(
          integrationDependencies
        ),
      };
    })
  );
