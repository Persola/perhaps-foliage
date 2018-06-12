// @flow
import type { booleanLiteral } from '../boolean-literal'

export type primitiveFunctionCall = {
  klass: 'functionCall',
  nor: true,
  argumentz: booleanLiteral[]
}
