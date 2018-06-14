// @flow
import type { init } from './actions/init'
import type { tempInit } from './actions/temp-init'
import type { replaceStage } from './actions/replace-stage'
import type { updateResult } from './actions/update-result'
import type { navigate } from './actions/navigate'

export type reduxAction = (
  | init
  | tempInit
  | replaceStage
  | updateResult
  | navigate
)
