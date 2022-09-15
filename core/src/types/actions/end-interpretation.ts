import { RawSyntaxTree } from '../syntactic/raw/raw-syntax-tree';

export type EndInterpretation = {
  readonly type: 'END_INTERPRETATION';
  readonly result: RawSyntaxTree;
};
