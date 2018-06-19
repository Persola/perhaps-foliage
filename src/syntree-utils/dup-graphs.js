// @flow
import type { synoMap } from '../types/editor-state/syno-map.js'

// $FlowFixMe
export default (value: synoMap): synoMap => {
  return JSON.parse(
    JSON.stringify(value)
  )
}
