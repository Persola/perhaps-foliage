export type VariableRefPresAttrs = {
  readonly syntype: 'variableRef';
  readonly focused: boolean;
  readonly presnoFocused: number | null | undefined;
  readonly charFocused: number | null | undefined;
  readonly valid: boolean;
  readonly valueSyntype: 'booleanLiteral';
  readonly name: string | null | undefined;
};
