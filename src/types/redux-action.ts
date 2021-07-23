// @flow
import type { Init } from './actions/init';
import type { OtherInit } from './actions/other-init';
import type { ReplaceFocusedSyno } from './actions/replace-focused-syno';
import type { EndInterpretation } from './actions/end-interpretation';
import type { Navigate } from './actions/navigate';
import type { SetFocusSyno } from './actions/set-focus-syno';
import type { StartInterpretation } from './actions/start-interpretation';
import type { CharBackspace } from './actions/char-backspace';
import type { DestroyFocusedSyno } from './actions/destroy-focused-syno';
import type { StartAsyncSyntreeLoad } from './actions/start-syntree-load';
import type { EndAsyncSyntreeLoad } from './actions/end-syntree-load';
import type { StartIntegrationLoad } from './actions/start-integration-load';
import type { EndIntegrationLoad } from './actions/end-integration-load';

export type ReduxAction = (
  | Init
  | OtherInit
  | ReplaceFocusedSyno
  | EndInterpretation
  | Navigate
  | SetFocusSyno
  | StartInterpretation
  | CharBackspace
  | DestroyFocusedSyno
  | StartAsyncSyntreeLoad
  | EndAsyncSyntreeLoad
  | StartIntegrationLoad
  | EndIntegrationLoad
)