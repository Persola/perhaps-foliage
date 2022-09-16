import { AbsoluteSynoUri } from 'perhaps-foliage/dist/types/syntactic/syno-uri';

export type RawArgument = {
  readonly id: string;
  readonly type: 'argument';
  attrs: Record<string, never>;
  rootwardEdgeLabel: 'argument';
  parentId: string;
  childIds: string[];
  intratreeRefs: {
    parameter: string;
  };
  intertreeRefs: {
    parameter: AbsoluteSynoUri;
  };
};
