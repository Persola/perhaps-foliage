import type { Syntype } from '../../synos/syntype';

export type FunctionParameterPresAttrs = {
  readonly syntype: 'functionParameter';
  readonly focused: boolean;
  readonly presnoFocused: number | null;
  readonly charFocused: number | null;
  readonly slot: string;
  readonly valueSyntype: Syntype;
};
