// @flow
import type { SynoId } from '../../../../../types/syno-id'
import type { SynoRef } from '../../../../../types/syno-ref'
import type { PresnoRef } from '../../../../../types/presenter/presno-ref'

export type OlympianPresAttrs = {
  syntype: 'olympian',
  name: string,
  child: (PresnoRef | false),
  focused: boolean,
  presnoFocused: (number | false),
  charFocused: (number | false),
  valid: boolean
}
