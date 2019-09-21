// @flow
import type { PresnoRef } from '../../../../../types/presenter/presno-ref'

export type FunctionCallPresAttrs = {
  syntype: 'functionCall',
  name: (string | false),
  argumentz: PresnoRef[],
  callee: (PresnoRef | false),
  resolved: boolean,
  focused: boolean,
  valid: boolean
}
