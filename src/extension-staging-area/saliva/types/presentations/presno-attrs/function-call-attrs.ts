// @flow
import type { PresnoRef } from '../../../../../types/presenter/presno-ref';

export type FunctionCallPresAttrs = {|
  +syntype: 'functionCall',
  +focused: boolean,
  +presnoFocused: ?number,
  +charFocused: ?number,
  +valid: boolean,
  +name: ?string,
  +argumentz: PresnoRef[],
  +callee: ?PresnoRef,
  +resolved: boolean,
|}
