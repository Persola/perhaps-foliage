import validateArgument from './validate-argument';
import validateBooleanLiteral from './validate-boolean-literal';
import validateFunctionCall from './validate-function-call';
import validateFunctionDefinition from './validate-function-definition';
import validateFunctionParameter from './validate-function-parameter';
import validateVariableRef from './validate-variable-ref';

export default ({
  booleanLiteral: validateBooleanLiteral,
  functionCall: validateFunctionCall,
  functionDefinition: validateFunctionDefinition,
  functionParameter: validateFunctionParameter,
  argument: validateArgument,
  variableRef: validateVariableRef,
});
