import { RawSyntaxTree } from '../syntactic/newnew/raw/raw-syntax-tree';

export type EndInterpretation = {
  readonly type: 'END_INTERPRETATION';
  readonly result: RawSyntaxTree;
};
