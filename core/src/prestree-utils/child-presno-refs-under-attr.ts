import type { Presno } from '../types/presenter/presno';
import type { PresnoRef } from '../types/presenter/presno-ref';

export default (parentSyno: Presno, attr: string): PresnoRef[] => {
  const val = parentSyno[attr];

  if (val instanceof Array) {
    return val;
  }

  // @ts-ignore
  return [val];
};
