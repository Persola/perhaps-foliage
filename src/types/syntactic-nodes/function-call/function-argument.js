// @flow
import type { functionDefinition } from '../function-definition'
import type { booleanLiteral } from '../boolean-literal'
import type { functionCall } from '../function-call'
import type { variableRef } from '../variable-ref'
import type { synoRef } from '../../syno-ref'

export type functionArgument = {
  id: string,
  parent: synoRef,
  klass: 'functionArgument',
  name: string,
  value: (
    | booleanLiteral
    | functionCall
    | variableRef
    | functionDefinition
  )
}
