// @flow
import type { PresnoRef } from '../presno-ref'

export type FunctionDefPresAttrs = {
  syntype: 'functionDefinition',
  name: string,
  parameters: PresnoRef[],
  focused: boolean,
  presnoFocused: (number | false),
  body: PresnoRef
}
