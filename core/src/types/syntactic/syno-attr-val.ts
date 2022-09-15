type Simple = (
  null
  | boolean
  | number
  | string
);

export type SynoAttrVal = (
  Simple
  | Record<string, Simple>
);
