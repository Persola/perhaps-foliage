// @flow
import type { SynoRef } from '../../syno-ref'
import type { PresnoRef } from '../presno-ref'

export type FunctionCallPresAttrs = {
  syntype: 'functionCall',
  name: (string | false),
  argumentz: PresnoRef[],
  bodyRef: (SynoRef | false),
  resolved: boolean,
  focused: boolean
}
