// @flow
import type { SynoId } from '../syno-id';

export type DestroyFocusedSyno = {|
  +type: 'DESTROY_FOCUSED_SYNO',
  +focusedPresnoId: SynoId,
|}
