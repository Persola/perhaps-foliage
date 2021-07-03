// @flow
import type { SynoId } from '../syno-id';
import type { ChildPresnoRef } from '../child-presno-ref';

export type DestroyFocusedSyno = {|
  +type: 'DESTROY_FOCUSED_SYNO',
  +focusedPresnoId: SynoId,
  +oldFocusedPresnoRef: ChildPresnoRef,
|}
