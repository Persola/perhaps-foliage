// @flow
import type { Syntype } from '../../synos/syntype';

export type FunctionParameterPresAttrs = {|
  +syntype: 'functionParameter',
  +focused: boolean,
  +presnoFocused: ?number,
  +charFocused: ?number,
  +slot: string,
  +valueSyntype: Syntype,
|}
