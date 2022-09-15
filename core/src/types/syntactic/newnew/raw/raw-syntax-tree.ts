import { SynoMap } from './syno-map';
import { InverseEdgeMap } from './inverse-edge-map';
import { AbsoluteSynoUri } from '../syno-uri';

export type RawSyntaxTree = {
  dependencies: AbsoluteSynoUri[];
  synoMap: SynoMap;
  inverseExtratreeEdges: InverseEdgeMap;
  rootId: string;
  lastId: number;
};
