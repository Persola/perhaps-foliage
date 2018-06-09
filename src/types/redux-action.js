// @flow
import type { init } from './actions/init'
import type { tempInit } from './actions/temp-init'
import type { updateStage } from './actions/update-stage'
import type { updateResult } from './actions/update-result'

export type reduxAction = (init | tempInit | updateStage | updateResult)
