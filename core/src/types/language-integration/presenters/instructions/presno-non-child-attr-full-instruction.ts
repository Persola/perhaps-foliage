export type CopyInstruction = {
  readonly from: 'attr';
  readonly attr: string;
};

export type ReadRefAttrInstruction = {
  readonly from: 'refAttr';
  readonly ref: string;
  readonly attr: string;
  readonly ifEdgeType: string;
};

export type PresnoNonChildAttrFullInstruction = (
  | CopyInstruction
  | ReadRefAttrInstruction
);
