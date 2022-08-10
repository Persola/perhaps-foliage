import type { PresenterProvisions } from 'perhaps-foliage/dist/types/language-integration/presenters/presenters-provisions';

import presentBooleanLiteral from './present-boolean-literal';
import presentFunctionCall from './present-function-call';
import presentFunctionDefinition from './present-function-definition';
import presentFunctionParameter from './present-function-parameter';
import presentArgument from './present-argument';
import presentVariableRef from './present-variable-ref';

export default ({
  booleanLiteral: presentBooleanLiteral,
  functionCall: presentFunctionCall,
  functionDefinition: presentFunctionDefinition,
  functionParameter: presentFunctionParameter,
  argument: presentArgument,
  variableRef: presentVariableRef,
} as PresenterProvisions);
