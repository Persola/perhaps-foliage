// @flow
import type { PresnoRef } from '../../../../../types/presenter/presno-ref'

export type ArgumentPresAttrs = {
  syntype: 'argument',
  name: (string | false),
  value: (PresnoRef | false),
  focused: boolean
}
