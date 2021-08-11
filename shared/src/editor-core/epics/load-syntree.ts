import { Observable, filter, map } from 'rxjs';

import type { Action } from 'redux';
import type { StateObservable } from 'redux-observable';

import loadSyntreeFromString from '../../code-loader/load-syntree-from-string';

import type { EditorState } from '../../types/editor-state';
import type { StartAsyncSyntreeLoad } from '../../types/actions/start-syntree-load';
import type { StateSelector } from '../../types/state-selector';
import type { CoresideLanguageIntegration } from '../../types/language-integration/coreside-language-integration';

export default (
  action$: Observable<Action>,
  state$: StateObservable<EditorState>,
  state: StateSelector,
  integration: CoresideLanguageIntegration,
) => action$.pipe(
  filter((action: Action) => {
    return action.type === 'START_SYNTREE_LOAD' && state.integrationLoaded();
  }),
  map((action: StartAsyncSyntreeLoad) => {
    return {
      type: 'END_SYNTREE_LOAD',
      newSynoMap: loadSyntreeFromString(action.fileText, integration),
    };
  }),
);
