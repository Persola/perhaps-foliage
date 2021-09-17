import type { PresnoRef } from '../presno-ref';

export type NamePartPresAttrs = {
  id: string;
  parent: PresnoRef;
  prestype: 'NamePart';
  focused: boolean;
  charFocused: number;
  valid: boolean;
  namePart: string;
};
