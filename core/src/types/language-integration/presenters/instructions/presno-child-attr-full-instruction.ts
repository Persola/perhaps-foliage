export type NamePartInstruction = {
  readonly from: 'attr';
  readonly attr: string;
  readonly as: 'NamePart';
};

export type PresnoChildAttrFullInstruction = (
  | NamePartInstruction
);
