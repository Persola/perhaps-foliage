// @flow
import type { SynoId } from '../../../../types/syno-id'
import type { SynoRef } from '../../../../types/syno-ref'
import type { Olympian } from './Olympian'

export type Titan = {
  syntype: 'titan',
  name: string,
  child: (Olympian | false),
  synoId: string,
  focused: boolean,
  presnoFocused: (number | false),
  charFocused: (number | false),
  valid: boolean
}
