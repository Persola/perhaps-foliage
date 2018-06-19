// @flow
import type { synoRef } from '../syno-ref'

export type booleanLiteral = {
  id: string,
  parent: synoRef,
  syntype: 'booleanLiteral',
  value: boolean
}
