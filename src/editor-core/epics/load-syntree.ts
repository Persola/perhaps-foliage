import { Observable, filter, map, mergeMap } from 'rxjs';

import type { Action } from 'redux';
import type { StateObservable } from 'redux-observable';

import loadSyntreeFromFileObject from '../../code-loader/load-syntree-from-file-object';

import type { EditorState } from '../../types/editor-state';
import type { StartAsyncSyntreeLoad } from '../../types/actions/start-syntree-load';
import type { StateSelector } from '../../types/state-selector';
import type { LanguageIntegration } from '../../types/language-integration';

export default (
  action$: Observable<Action>,
  state$: StateObservable<EditorState>,
  state: StateSelector,
  integration: LanguageIntegration,
) => action$.pipe(
  filter((action: Action) => {
    return action.type === 'START_SYNTREE_LOAD' && state.integrationLoaded();
  }),
  mergeMap((action: StartAsyncSyntreeLoad) => {
    return loadSyntreeFromFileObject(action.file, integration);
  }),
  map(syntree => {
    return {
      type: 'END_SYNTREE_LOAD',
      newSynoMap: syntree,
    };
  }),
);
