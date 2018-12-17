// @flow
import type { FocusedPresnoId } from './focused-presno-id'

export type Focus = {
  synoId: FocusedPresnoId,
  presnoIndex: (number | false),
  charIndex: (number | false)
}
