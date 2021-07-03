// @flow
import type { FocusedPresnoId } from '../editor-state/focused-presno-id';

export type CharBackspace = {|
  +type: 'CHAR_BACKSPACE',
  +focusSynoId: FocusedPresnoId,
  +focusPresnoIndex: number,
  +focusCharIndex: number,
|}
