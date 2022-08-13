import type { PresnoNonChildAttrInstruction } from './instructions/presno-non-child-attr-instruction';
import type { PresnoChildAttrInstruction } from './instructions/presno-child-attr-instruction';

export type PresenterConfig = {
  attrs: {
    [presnoNonChildAttrName: string]: PresnoNonChildAttrInstruction,
  },
  childPresnoArgs: {
    [presnoChildAttrName: string]: PresnoChildAttrInstruction,
  },
};
