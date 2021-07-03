// @flow
import type { PresnoRef } from '../../../../../types/presenter/presno-ref';

export type FunctionCallPresAttrs = {|
  +syntype: 'functionCall',
  +focused: boolean,
  +presnoFocused: (number | false),
  +charFocused: (number | false),
  +valid: boolean,
  +name: (string | false),
  +argumentz: PresnoRef[],
  +callee: (PresnoRef | false),
  +resolved: boolean,
|}
