// @flow
import type { PresnoRef } from '../../../../../types/presenter/presno-ref';

export type FunctionDefPresAttrs = {|
  +syntype: 'functionDefinition',
  +focused: boolean,
  +presnoFocused: (number | false),
  +charFocused: (number | false),
  +valid: boolean,
  +name: string,
  +parameters: PresnoRef[],
  +body: (PresnoRef | false),
|}
