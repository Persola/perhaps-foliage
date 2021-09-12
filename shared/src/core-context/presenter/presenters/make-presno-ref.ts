import type { SynoRef } from '../../../types/syntactic/syno-ref';
import type { PresnoRef } from '../../../types/presenter/presno-ref';

export default (synoRef: null | SynoRef): (null | PresnoRef) => {
  if (synoRef === null) {
    return null;
  }

  return {
    presnoRef: true,
    id: synoRef.id,
  };
};
