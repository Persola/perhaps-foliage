/*
  no flow because there's no types for rxjs in flow-typed that the current version of flow digests,
  let alone ones for an updated version of rxjs
*/
import { filter, map, mergeMap } from "rxjs";
import loadSyntreeFromFileObject from "../../code-loader/load-syntree-from-file-object";
export default ((action$, state$, state) => action$.pipe(filter(action => {
  return action.type === 'START_SYNTREE_LOAD' && state.integrationLoaded();
}), mergeMap(action => {
  return loadSyntreeFromFileObject(action.file);
}), map(syntree => {
  return {
    type: 'END_SYNTREE_LOAD',
    newSynoMap: syntree
  };
})));