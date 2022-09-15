import type { RawSyntaxTree } from './raw/raw-syntax-tree';

export type TreeList = {
  [syntaxTreeId: string]: RawSyntaxTree
};
