import { Observable, filter, map } from 'rxjs';

import type { Action } from 'redux';
import type { StateObservable } from 'redux-observable';

import type { EditorState } from '../../../types/editor-state';
import type { StateSelector } from '../../../types/state-selector';
import type { CoresideLanguageIntegration } from '../../../types/language-integration/coreside-language-integration';
import type { InterpretationResolutionSuccess } from '../../../types/interpreter/interpretation-resolution-success';

export default (
  action$: Observable<Action>,
  state$: StateObservable<EditorState>,
  state: StateSelector,
  integration: CoresideLanguageIntegration,
) => action$.pipe(
  filter((action: Action) => {
    if (action.type !== 'START_INTERPRETATION') {
      return false;
    }

    if (!state.integrationLoaded()) {
      console.warn(
        'Ignoring START_INTERPRETATION action: no integration loaded',
      );
      return false;
    }

    if (!integration.interpret) {
      console.warn(
        'Ignoring START_INTERPRETATION action: integration lacks interpreter',
      );
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
