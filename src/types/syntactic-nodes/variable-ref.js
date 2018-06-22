// @flow
import type { SynoId } from '../syno-id'
import type { SynoRef } from '../syno-ref'

export type VariableRef = {
  id: SynoId,
  parent: (SynoRef | false),
  syntype: 'variableRef',
  valueKlass: 'booleanLiteral',
  name: string
}
