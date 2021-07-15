/*
  no flow because there's no types for rxjs in flow-typed that the current version of flow digests,
  let alone ones for an updated version of rxjs
*/
import { map, mergeMap } from 'rxjs';
import { ofType } from 'redux-observable';

import loadSyntreeFromFileObject from '../../code-loader/load-syntree-from-file-object';

export default action$ => action$.pipe(
  ofType('START_SYNTREE_LOAD'),
  mergeMap(action => {
    return loadSyntreeFromFileObject(action.file);
  }),
  map(syntree => {
    return {
      type: 'END_SYNTREE_LOAD',
      newSynoMap: syntree,
    };
  }),
);
