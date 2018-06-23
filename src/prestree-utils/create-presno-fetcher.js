// @flow
import type { SynoId } from '../types/syno-id.js'
import type { PresnoMap } from '../types/presentations/presno-map.js'

export default (presnoMap: PresnoMap) => {
  return  (presnoId: SynoId) => {
    return presnoMap[presnoId];
  }
}
