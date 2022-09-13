import { SynoMap } from './syno-map';
import { InverseEdgeMap } from './inverse-edge-map';
import { AbsoluteSynoUri } from '../syno-uri';

export type RawSyntaxTree = {
  synoMap: SynoMap;
  inverseExtratreeEdges: InverseEdgeMap;
  rootId: string;
  dependencies: AbsoluteSynoUri[];
};
