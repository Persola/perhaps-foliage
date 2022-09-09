export type RawOlympian = {
  readonly id: string;
  readonly type: 'olympian';
  attrs: {
    name: string;
  };
  rootwardEdgeLabel: 'child';
  parentId: string;
  childIds: string[];
  intratreeRefs: Record<string, never>;
  intertreeRefs: Record<string, never>;
};
