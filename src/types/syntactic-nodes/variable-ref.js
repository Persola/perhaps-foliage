// @flow
import type { synoRef } from '../syno-ref'

export type variableRef = {
  id: string,
  parent: (synoRef | false),
  syntype: 'variableRef',
  valueKlass: 'booleanLiteral',
  name: string
}
