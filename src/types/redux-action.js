// @flow
import type { Init } from './actions/init'
import type { OtherInit } from './actions/other-init'
import type { ReplaceFocusedSyno } from './actions/replace-focused-syno'
import type { EndInterpretation } from './actions/end-interpretation'
import type { Navigate } from './actions/navigate'
import type { SetFocusSyno } from './actions/set-focus-syno'
import type { StartInterpretation } from './actions/start-interpretation'
import type { CharBackspace } from './actions/char-backspace'
import type { DestroyFocusedSyno } from './actions/destroy-focused-syno'

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
)
