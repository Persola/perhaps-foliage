import type { SynPresnoArgs } from './syn-presno-args';
import type { NonSynPresnoArgs } from './non-syn-presno-args';
import type { BudArgs } from './bud-args';
import type { NamePartArgs } from './name-part-args';

export type PresnoArgs = SynPresnoArgs | NonSynPresnoArgs<BudArgs | NamePartArgs>;
