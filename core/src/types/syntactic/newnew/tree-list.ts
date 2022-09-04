import type { RawSyntaxTree } from './raw/raw-syntax-tree';

export type TreeList = {
  [id: string]: RawSyntaxTree;
};
