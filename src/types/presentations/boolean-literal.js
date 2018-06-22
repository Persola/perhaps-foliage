// @flow
import type { SynoId } from '../syno-id'

export type BooleanLiteralPres = {
  syntype: 'booleanLiteral',
  synoId: SynoId,
  value: boolean,
  focused: boolean
}
