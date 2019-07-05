// @flow
import type { PresnoRef } from '../presno-ref'

export type ArgumentPresAttrs = {
  syntype: 'argument',
  name: (string | false),
  value: (PresnoRef | false),
  focused: boolean
}
