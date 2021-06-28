// @flow
import type { SynoId } from '../types/syno-id.js';
import type { PresnoMap } from '../types/presenter/presno-map.js';

export default (presnoMap: PresnoMap) => (synoId: SynoId) => presnoMap[synoId];
