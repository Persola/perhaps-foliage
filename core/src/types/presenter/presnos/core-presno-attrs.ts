import type { PresnoRef } from '../presno-ref';

export type CorePresnoAttrs = {
  id: string;
  parent: PresnoRef;
  valid: boolean;
  focused: boolean;
  charFocused: number | null;
};
