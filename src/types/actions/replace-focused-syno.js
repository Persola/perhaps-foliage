// @flow
import type { SynoId } from '../syno-id'

export type ReplaceFocusedSyno = {
  type: 'REPLACE_FOCUSED_SYNO',
  newSynoAttrs: {
    syntype: 'booleanLiteral',
    value: boolean
  },
  newSynoId: SynoId,
  focusedPresnoId: SynoId
}
