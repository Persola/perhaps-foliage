// @flow
import type { primitiveFunctionCall } from './function-call/primitive-function-call'
import type { nonPrimitiveFunctionCall } from './function-call/non-primitive-function-call'

export type functionCall = (primitiveFunctionCall | nonPrimitiveFunctionCall)
