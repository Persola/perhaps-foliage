// @flow
import type { SynoId } from '../types/syno-id.js';
import type { PresnoMap } from '../types/presenter/presno-map.js';
import type { Presno } from '../types/presenter/presno.js';

export default (presnoMap: PresnoMap): (SynoId => Presno) => (
  (synoId: SynoId) => presnoMap[synoId]
);
