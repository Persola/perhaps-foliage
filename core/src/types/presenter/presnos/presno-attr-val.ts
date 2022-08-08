import type { PresnoRef } from '../presno-ref';

type Simple = (
  null
  | boolean
  | number
  | string
);

export type PresnoAttrVal = (
  Simple
  | Record<string, Simple>
  | PresnoRef
  | PresnoRef[]
);
