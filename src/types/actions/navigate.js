// @flow
import type { syno } from '../syno'

export type navigate = {
  type: 'NAVIGATE',
  direction: ('out' | 'in' | 'prev' | 'next'),
  oldFocusedNode: syno,
  oldParent: (syno | false)
}
