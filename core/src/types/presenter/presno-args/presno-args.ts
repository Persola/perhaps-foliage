import type { SynPresnoArgs } from './syn-presno-args';
import type { NonSynPresnoArgs } from './non-syn-presno-args';
import type { GapArgs } from './gap-args';
import type { BudArgs } from './bud-args';
import type { NamePartArgs } from './name-part-args';

export type PresnoArgs = (
  | SynPresnoArgs
  | NonSynPresnoArgs<GapArgs | BudArgs | NamePartArgs>
);
