import { SynoMap } from './syno-map';
import { InverseEdgeMap } from './inverse-edge-map';

export type RawSyntaxTree = {
  synoMap: SynoMap;
  inverseExtratreeEdges: InverseEdgeMap;
  rootId: string;
};
