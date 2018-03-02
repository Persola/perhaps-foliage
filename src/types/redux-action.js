// @flow
import type { init } from './actions/init'
import type { update } from './actions/update'
import type { updateResult } from './actions/update-result'

export type reduxAction = (init | update | updateResult)
