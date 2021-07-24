/*
  no flow because there's no types for rxjs in flow-typed that the current version of flow digests,
  let alone ones for an updated version of rxjs
*/
import { filter, map, mergeMap } from "rxjs";
import type { ReduxAction } from "../../types/redux-action";
import type { StartAsyncSyntreeLoad } from "../../types/actions/start-syntree-load";
import loadSyntreeFromFileObject from "../../code-loader/load-syntree-from-file-object";
export default (action$, state$, state, integration) =>
  action$.pipe(
    filter((action: ReduxAction) => {
      return action.type === "START_SYNTREE_LOAD" && state.integrationLoaded();
    }),
    mergeMap((action: StartAsyncSyntreeLoad) => {
      return loadSyntreeFromFileObject(action.file, integration);
    }),
    map((syntree) => {
      return {
        type: "END_SYNTREE_LOAD",
        newSynoMap: syntree,
      };
    })
  );
