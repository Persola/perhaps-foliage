// @flow
import type { SynoMap } from '../types/editor-state/syno-map.js'

// $FlowFixMe
export default (value: SynoMap): SynoMap => {
  return JSON.parse(
    JSON.stringify(value)
  )
}
