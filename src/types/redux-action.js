// @flow
import type { init } from './actions/init'
import type { tempInit } from './actions/temp-init'
import type { update } from './actions/update'
import type { updateResult } from './actions/update-result'

export type reduxAction = (init | tempInit | update | updateResult)
