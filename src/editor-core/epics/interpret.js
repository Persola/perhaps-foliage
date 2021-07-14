/*
  no flow because there's no types for rxjs in flow-typed that the current version of flow digests,
  let alone ones for an updated version of rxjs
*/
import { map } from 'rxjs';
import { ofType } from 'redux-observable';

import interpret from '../../extension-staging-area/saliva/interpreter/interpret';

export default (action$, state$, state) => action$.pipe(
  ofType('START_INTERPRETATION'),
  map(() => interpret(state$.value, state)),
  map(resolution => ({
    type: 'END_INTERPRETATION',
    result: resolution.result,
  })),
);
