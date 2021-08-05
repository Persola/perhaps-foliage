export type VariableRefPresAttrs = {
  readonly syntype: 'variableRef';
  readonly focused: boolean;
  readonly presnoFocused: number | null;
  readonly charFocused: number | null;
  readonly valid: boolean;
  readonly valueSyntype: 'booleanLiteral';
  readonly name: string | null;
};
