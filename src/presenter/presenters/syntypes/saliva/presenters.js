// @flow
import presentBooleanLiteral from './present-boolean-literal.js'
import presentFunctionCall from './present-function-call.js'
import presentFunctionDefinition from './present-function-definition.js'
import presentFunctionParameter from './present-function-parameter.js'
import presentArgument from './present-argument.js'
import presentVariableRef from './present-variable-ref.js'

export default {
  'booleanLiteral': presentBooleanLiteral,
  'functionCall': presentFunctionCall,
  'functionDefinition': presentFunctionDefinition,
  'functionParameter': presentFunctionParameter,
  'argument': presentArgument,
  'variableRef': presentVariableRef
};
