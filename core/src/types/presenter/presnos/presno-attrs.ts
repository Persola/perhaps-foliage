export type Simple = (
  null
  | boolean
  | number
  | string
);

export type PresnoAttrVal = (
  | Simple
  | Record<string, Simple>
);
