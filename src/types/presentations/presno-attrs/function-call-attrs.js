// @flow
import type { Argumentz } from '../argumentz'

export type FunctionCallPresAttrs = {
  syntype: 'functionCall',
  name: string,
  argumentz: Argumentz,
  resolved: boolean,
  focused: boolean
}
