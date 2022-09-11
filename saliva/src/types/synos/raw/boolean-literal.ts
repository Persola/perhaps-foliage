export type RawBooleanLiteral = {
  readonly id: string;
  readonly type: 'booleanLiteral';
  attrs: {
    value: boolean;
  };
  rootwardEdgeLabel: 'value' | 'body' | null;
  parentId: string | null;
  childIds: string[];
  intratreeRefs: Record<string, never>;
  intertreeRefs: Record<string, never>;
};
