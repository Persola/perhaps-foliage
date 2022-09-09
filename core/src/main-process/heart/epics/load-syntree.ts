import { Observable, filter, map, catchError, of } from 'rxjs';

import type { Action } from 'redux';
import type { StateObservable } from 'redux-observable';

import StateSelector from '../../selectors/state-selector';

import codeLoader from '../../code-loader/code-loader';

import type { EditorState } from '../../../types/editor-state/editor-state';
import type { StartAsyncSyntreeLoad } from '../../../types/actions/start-syntree-load';
import type { MainsideLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { EndAsyncSyntreeLoad } from '../../../types/actions/end-syntree-load';

export default (
  action$: Observable<Action>,
  state$: StateObservable<EditorState>,
  state: StateSelector,
  integration: MainsideLangInt,
  // @ts-ignore: TS isn't matching the type properties inside the objects inside the observables
): Observable<EndAsyncSyntreeLoad> => action$.pipe(
  filter((action: Action) => action.type === 'START_SYNTREE_LOAD'),
  map((action: StartAsyncSyntreeLoad) => {
    const serializedTree = JSON.parse(action.fileText);
    return {
      type: 'END_SYNTREE_LOAD',
      newIngestedTree: codeLoader.fromSerializedTree(serializedTree),
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
