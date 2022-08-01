import type { SynoRef } from '../syno-ref';

type Simple = (
  null
  | boolean
  | number
  | string
);

export type SynoAttrVal = (
  Simple
  | Record<string, Simple>
  | SynoRef
  | SynoRef[]
);
