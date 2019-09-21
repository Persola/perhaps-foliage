// @flow
import type { SynoId } from '../../../../types/syno-id'
import type { SynoRef } from '../../../../types/syno-ref'

export type Olympian = {
  syntype: 'olympian',
  name: string,
  child: (Olympian | false),
  synoId: string,
  focused: boolean,
  presnoFocused: (number | false),
  charFocused: (number | false),
  valid: boolean
}
