import type { Syntype } from '../../synos/syntype';

export type FunctionParameterPresAttrs = {
  readonly syntype: 'functionParameter';
  readonly slot: string;
  readonly valueSyntype: Syntype;
};
