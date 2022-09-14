import { RawSyntaxTree } from '../syntactic/newnew/raw/raw-syntax-tree';

export type InterpretationResolutionSuccess = {
  readonly success: true;
  readonly result: RawSyntaxTree;
};
