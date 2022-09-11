export type RawFunctionDefinition = {
  readonly id: string;
  readonly type: 'functionDefinition';
  attrs: {
    name: string;
  };
  rootwardEdgeLabel: 'callee';
  parentId: string;
  childIds: string[];
  intratreeRefs: Record<string, never>;
  intertreeRefs: Record<string, never>;
};
