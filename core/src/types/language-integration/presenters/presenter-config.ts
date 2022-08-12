import type { PresnoNonChildAttrInstruction } from './presno-non-child-attr-instruction';
import type { PresnoChildAttrInstruction } from './presno-child-attr-instruction';

export type PresenterConfig = {
  attrs: {
    [presnoNonChildAttrName: string]: PresnoNonChildAttrInstruction,
  },
  childPresnoArgs: {
    [presnoChildAttrName: string]: PresnoChildAttrInstruction,
  },
};
