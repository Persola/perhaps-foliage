// @flow
import type { synoId } from '../syno-id'

export type booleanLiteralPres = {
  syntype: 'booleanLiteral',
  synoId: synoId,
  value: boolean,
  focused: boolean
}
