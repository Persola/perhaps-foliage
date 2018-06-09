// @flow
import type { syntacticGraphMap } from './types/syntactic-graph-map.js'

// $FlowFixMe
export default (value: syntacticGraphMap): syntacticGraphMap => {
  return JSON.parse(
    JSON.stringify(value)
  )
}
