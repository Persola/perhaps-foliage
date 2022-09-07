import { Observable, filter, map } from 'rxjs';

import type { Action } from 'redux';
import type { StateObservable } from 'redux-observable';

import Syno from '../../syntactic-interface/newnew/readable/syno';

import type { EditorState } from '../../../types/editor-state/editor-state';
import type { StateSelector } from '../../../types/state-selector';
import type { MainsideLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { InterpretationResolutionSuccess } from '../../../types/interpreter/interpretation-resolution-success';
import type { Warn } from '../../../types/cross-context/warn';

export default (
  action$: Observable<Action>,
  state$: StateObservable<EditorState>,
  state: StateSelector,
  integration: MainsideLangInt,
  warnUser: Warn,
): Observable<{
  type: string,
  result: Syno,
}> => action$.pipe(
  filter((action: Action) => {
    if (action.type !== 'START_INTERPRETATION') {
      return false;
    }

    if (!state.integrationLoaded()) {
      warnUser('Ignoring START_INTERPRETATION action: no integration loaded');
      return false;
    }

    if (!integration.interpret) {
      warnUser('Ignoring START_INTERPRETATION action: integration lacks interpreter');
      return false;
    }

    return true;
  }),
  map(() => integration.interpret(state$.value, state)),
  map((resolution: InterpretationResolutionSuccess) => ({
    type: 'END_INTERPRETATION',
    result: resolution.result,
  })),
);
