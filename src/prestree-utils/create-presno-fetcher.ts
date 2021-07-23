// @flow
import type { SynoId } from '../types/syno-id';
import type { PresnoMap } from '../types/presenter/presno-map';
import type { Presno } from '../types/presenter/presno';

export default (presnoMap: PresnoMap): (SynoId => Presno) => (
  (synoId: SynoId) => presnoMap[synoId]
);
