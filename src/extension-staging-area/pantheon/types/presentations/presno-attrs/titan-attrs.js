// @flow
import type { PresnoRef } from '../../../../../types/presenter/presno-ref';

export type TitanPresAttrs = {|
  +syntype: 'titan',
  +name: string,
  +child: ?PresnoRef,
  +focused: boolean,
  +presnoFocused: ?number,
  +charFocused: ?number,
  +valid: boolean,
|}
