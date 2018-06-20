// @flow
import type { init } from './actions/init'
import type { replaceFocusedNode } from './actions/replace-focused-node'
import type { updateResult } from './actions/update-result'
import type { navigate } from './actions/navigate'
import type { setFocusSyno } from './actions/set-focus-syno'

export type reduxAction = (
  | init
  | replaceFocusedNode
  | updateResult
  | navigate
  | setFocusSyno
)
