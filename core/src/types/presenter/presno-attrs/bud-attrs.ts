import type { PresnoRef } from '../presno-ref';

export type BudPresAttrs = {
  id: string;
  parent: PresnoRef;
  prestype: 'bud';
  focused: boolean;
  valid: boolean;
};
