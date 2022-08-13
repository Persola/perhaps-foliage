import type { PresnoRef } from '../presno-ref';

export type Simple = (
  null
  | boolean
  | number
  | string
);

export type PresnoNonChildAttrVal = (
  Simple
  | Record<string, Simple>
);

export type PresnoChildAttrVal = (
  | PresnoRef
  | PresnoRef[]
);

export type PresnoAttrVal = (
  | PresnoNonChildAttrVal
  | PresnoChildAttrVal
);
