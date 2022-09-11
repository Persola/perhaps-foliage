export type RawVariableRef = {
  readonly id: string;
  readonly type: 'variableRef';
  attrs: {
    valueType: string;
  };
  rootwardEdgeLabel: 'value' | 'body' | null;
  parentId: string | null;
  childIds: string[];
  intratreeRefs: {
    parameter: string;
  };
  intertreeRefs: Record<string, never>;
};
