// @flow
import type { booleanLiteral } from '../boolean-literal'
import type { functionCall } from '../function-call'

export type functionArgument = (booleanLiteral | functionCall)
