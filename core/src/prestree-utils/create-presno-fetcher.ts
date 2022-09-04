import type { PresnoMap } from '../types/presenter/presno-map/presno-map';
import type { Presno } from '../types/presenter/presnos/presno';

export default (presnoMap: PresnoMap) => {
  return (presnoId: string): Presno => presnoMap[presnoId];
};
