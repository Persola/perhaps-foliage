import { RawSyntaxTree } from '../syntactic/raw/raw-syntax-tree';

export type InterpretationResolutionSuccess = {
  readonly success: true;
  readonly result: RawSyntaxTree;
};
