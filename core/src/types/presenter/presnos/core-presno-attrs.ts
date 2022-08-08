import type { PresnoRef } from '../presno-ref';

export type CorePresnoAttrs = {
  id: string;
  parent: PresnoRef;
  focused: boolean;
  valid: boolean;
};
