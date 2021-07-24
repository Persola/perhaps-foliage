import type { SynoId } from '../types/syntactic/syno-id';
import type { PresnoMap } from '../types/presenter/presno-map';
import type { Presno } from '../types/presenter/presno';

export default (presnoMap: PresnoMap) => {
  return (synoId: SynoId): Presno => presnoMap[synoId];
};
