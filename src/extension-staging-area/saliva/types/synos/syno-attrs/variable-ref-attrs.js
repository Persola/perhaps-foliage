// @flow
import type { SynoRef } from '../../../../../types/syno-ref';

export type VariableRefAttrs = {
  syntype: 'variableRef',
  valueSyntype: 'booleanLiteral',
  referent: (SynoRef | false)
}
