// @flow
import type { PresnoRef } from '../presno-ref'

export type TitanPresAttrs = {
  syntype: 'titan',
  name: string,
  focused: boolean,
  presnoFocused: boolean,
  charFocused: boolean,
  valid: boolean,
  child: PresnoRef
}
