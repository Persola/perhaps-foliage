// @flow
import type { SynoRef } from '../../../../../types/syno-ref';

export type FunctionCallAttrs = {|
  syntype: 'functionCall',
  callee: (SynoRef | false),
  argumentz: SynoRef[],
|}
