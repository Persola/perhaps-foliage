// @flow
import type { SynoId } from '../syno-id';
import type { BooleanLiteralAttrs } from '../../extension-staging-area/saliva/types/synos/syno-attrs/boolean-literal-attrs';

export type ReplaceFocusedSyno = {|
  +type: 'REPLACE_FOCUSED_SYNO',
  +newSynoAttrs: BooleanLiteralAttrs,
  +newSynoId: SynoId,
  +focusedPresnoId: SynoId,
|}
