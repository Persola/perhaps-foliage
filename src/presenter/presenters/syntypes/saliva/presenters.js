// @flow
import presentBooleanLiteral from './syntypes/saliva/present-boolean-literal.js'
import presentFunctionCall from './syntypes/saliva/present-function-call.js'
import presentFunctionDefinition from './syntypes/saliva/present-function-definition.js'
import presentFunctionParameter from './syntypes/saliva/present-function-parameter.js'
import presentArgument from './syntypes/saliva/present-argument.js'
import presentVariableRef from './syntypes/saliva/present-variable-ref.js'

export default {
  'booleanLiteral': presentBooleanLiteral,
  'functionCall': presentFunctionCall,
  'functionDefinition': presentFunctionDefinition,
  'functionParameter': presentFunctionParameter,
  'argument': presentArgument,
  'variableRef': presentVariableRef
};
