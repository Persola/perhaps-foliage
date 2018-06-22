// @flow
import type { Init } from './actions/init'
import type { OtherInit } from './actions/other-init'
import type { ReplaceFocusedNode } from './actions/replace-focused-node'
import type { UpdateResult } from './actions/update-result'
import type { Navigate } from './actions/navigate'
import type { SetFocusSyno } from './actions/set-focus-syno'

export type ReduxAction = (
  | Init
  | OtherInit
  | ReplaceFocusedNode
  | UpdateResult
  | Navigate
  | SetFocusSyno
)
