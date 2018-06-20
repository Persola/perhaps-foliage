// @flow
import type { synoId } from '../syno-id'
import type { synoRef } from '../syno-ref'

export type variableRef = {
  id: synoId,
  parent: (synoRef | false),
  syntype: 'variableRef',
  valueKlass: 'booleanLiteral',
  name: string
}
