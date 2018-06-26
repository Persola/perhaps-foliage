// @flow
import type { PresnoRef } from '../presno-ref'

export type ArgumentPresAttrs = {
  syntype: 'argument',
  name: string,
  value: PresnoRef,
  focused: boolean
}
