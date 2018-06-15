// @flow
import type { init } from './actions/init'
import type { tempInit } from './actions/temp-init'
import type { replaceFocusedNode } from './actions/replace-focused-node'
import type { updateResult } from './actions/update-result'
import type { navigate } from './actions/navigate'

export type reduxAction = (
  | init
  | tempInit
  | replaceFocusedNode
  | updateResult
  | navigate
)
