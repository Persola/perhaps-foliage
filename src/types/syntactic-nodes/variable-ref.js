// @flow
import type { synoRef } from '../syno-ref'

export type variableRef = {
  id: string,
  parent: synoRef,
  klass: 'variableRef',
  valueKlass: 'booleanLiteral',
  name: string
}
