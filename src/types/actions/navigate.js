// @flow
import type { Syno } from '../syno'

export type Navigate = {
  type: 'NAVIGATE',
  direction: ('out' | 'in' | 'prev' | 'next'),
  oldFocusedSyno: Syno,
  oldParent: (Syno | false)
}
