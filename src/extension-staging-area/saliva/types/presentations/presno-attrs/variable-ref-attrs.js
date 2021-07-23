// @flow
export type VariableRefPresAttrs = {|
  +syntype: 'variableRef',
  +focused: boolean,
  +presnoFocused: ?number,
  +charFocused: ?number,
  +valid: boolean,
  +valueSyntype: 'booleanLiteral',
  +name: ?string,
|}
