// @flow
import type { Syno } from '../syno'

export type Navigate = {
  type: 'NAVIGATE',
  direction: ('out' | 'in' | 'prev' | 'next'),
  oldFocusedNode: Syno,
  oldParent: (Syno | false)
}
