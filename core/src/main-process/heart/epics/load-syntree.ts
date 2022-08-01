import { Observable, filter, map, catchError, of } from 'rxjs';

import type { Action } from 'redux';
import type { StateObservable } from 'redux-observable';

import codeLoader from '../../code-loader/code-loader';

import type { EditorState } from '../../../types/editor-state';
import type { StartAsyncSyntreeLoad } from '../../../types/actions/start-syntree-load';
import type { StateSelector } from '../../../types/state-selector';
import type { MainsideLanguageIntegration } from '../../../types/language-integration/mainside-language-integration';
import type { EndAsyncSyntreeLoad } from '../../../types/actions/end-syntree-load';

export default (
  action$: Observable<Action>,
  state$: StateObservable<EditorState>,
  state: StateSelector,
  integration: MainsideLanguageIntegration,
  // @ts-ignore: TS isn't matching the type properties inside the objects inside the observables
): Observable<EndAsyncSyntreeLoad> => action$.pipe(
  filter((action: Action) => {
    return action.type === 'START_SYNTREE_LOAD' && state.integrationLoaded();
  }),
  map((action: StartAsyncSyntreeLoad) => {
    return {
      type: 'END_SYNTREE_LOAD',
      newSynoMap: codeLoader.fromString(action.fileText, integration),
    };
  }),
  catchError((error: Error) => {
    console.error(error);

    return of({
      type: 'END_SYNTREE_LOAD',
      newSynoMap: null,
    });
  }),
);
