export type RawFunctionParameter = {
  readonly id: string;
  readonly type: 'functionParameter';
  attrs: {
    name: string;
    valueType: string;
  };
  rootwardEdgeLabel: 'parameter';
  parentId: string;
  childIds: string[];
  intratreeRefs: Record<string, never>;
  intertreeRefs: Record<string, never>;
};
