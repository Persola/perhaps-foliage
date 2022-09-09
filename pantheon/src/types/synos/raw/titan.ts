export type RawTitan = {
  readonly id: string;
  readonly type: 'titan';
  attrs: {
    name: string;
  };
  rootwardEdgeLabel: null;
  parentId: null;
  childIds: string[];
  intratreeRefs: Record<string, never>;
  intertreeRefs: Record<string, never>;
};
