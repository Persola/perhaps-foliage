import { AbsoluteSynoUri } from 'perhaps-foliage/dist/types/syntactic/newnew/syno-uri';

export type RawFunctionCall = {
  readonly id: string;
  readonly type: 'functionCall';
  attrs: Record<string, never>;
  rootwardEdgeLabel: 'value' | 'body' | null;
  parentId: string | null;
  childIds: string[];
  intratreeRefs: {
    callee: string;
  };
  intertreeRefs: {
    callee: AbsoluteSynoUri;
  };
};
