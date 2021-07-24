/*
  no flow because there's no types for rxjs in flow-typed that the current version of flow digests,
  let alone ones for an updated version of rxjs
*/
import { filter, map } from "rxjs";
import type { ReduxAction } from '../../types/redux-action'
import { InterpretationResolutionSuccess } from "../../types/interpreter/interpretation-resolution-success";
export default ((action$, state$, state, integration) => action$.pipe(filter((action: ReduxAction) => {
  if (action.type !== 'START_INTERPRETATION') {
    return false;
  }

  if (!state.integrationLoaded()) {
    console.warn('Ignoring START_INTERPRETATION action: no integration loaded');
    return false;
  }

  if (!integration.interpret) {
    console.warn('Ignoring START_INTERPRETATION action: integration lacks interpreter');
    return false;
  }

  return true;
}), map(() => integration.interpret(state$.value, state)), map((resolution: InterpretationResolutionSuccess) => ({
  type: 'END_INTERPRETATION',
  result: resolution.result
}))));