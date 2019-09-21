// @flow
import type { BooleanLiteralPres } from '../../extension-staging-area/saliva/types/presentations/boolean-literal'
import type { FunctionCallPres } from '../../extension-staging-area/saliva/types/presentations/function-call'
import type { FunctionDefPres } from '../../extension-staging-area/saliva/types/presentations/function-definition'
import type { FunctionParameterPres } from '../../extension-staging-area/saliva/types/presentations/function-parameter'
import type { ArgumentPres } from '../../extension-staging-area/saliva/types/presentations/argument'
import type { VariableRefPres } from '../../extension-staging-area/saliva/types/presentations/variable-ref'

export type Presno = (
  | BooleanLiteralPres
  | FunctionCallPres
  | FunctionDefPres
  | FunctionParameterPres
  | ArgumentPres
  | VariableRefPres
)
