import { RawSyntaxTree } from '../syntactic/newnew/raw/raw-syntax-tree';
import { InverseEdgeMap } from '../syntactic/newnew/inverse-edge-map';

export type IngestedTree = {
  rawTree: RawSyntaxTree;
  inverseExtraTreeEdges: InverseEdgeMap;
  rootId: number;
};
