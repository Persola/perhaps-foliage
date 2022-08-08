import type { CorePresnoAttrs } from '../core-presno-attrs';

export type NamePart = CorePresnoAttrs & {
  prestype: 'namePart';
  charFocused: number;
  namePart: string;
};
