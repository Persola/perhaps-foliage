// @flow
import type { PresnoRef } from '../../../../../types/presenter/presno-ref';

export type ArgumentPresAttrs = {|
  +syntype: 'argument',
  +focused: boolean,
  +presnoFocused: ?number,
  +charFocused: ?number,
  +valid: boolean,
  +name: ?string,
  +value: ?PresnoRef,
|}
