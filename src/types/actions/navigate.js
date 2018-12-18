// @flow
import type { ChildPresnoRef } from '../child-presno-ref'

export type Navigate = {
  type: 'NAVIGATE',
  direction: ('out' | 'in' | 'prev' | 'next'),
  oldFocusedPresnoRef: ChildPresnoRef
}
