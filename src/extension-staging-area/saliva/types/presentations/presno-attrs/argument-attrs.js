// @flow
import type { PresnoRef } from '../../../../../types/presenter/presno-ref';

export type ArgumentPresAttrs = {|
  +syntype: 'argument',
  +focused: boolean,
  +presnoFocused: (number | false),
  +charFocused: (number | false),
  +valid: boolean,
  +name: (string | false),
  +value: (PresnoRef | false),
|}
