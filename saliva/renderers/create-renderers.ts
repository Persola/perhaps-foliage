import createBooleanLiteral from './create-boolean-literal';
import createFunctionCall from './create-function-call';
import createFunctionDefinition from './create-function-definition';
import createFunctionParameter from './create-function-parameter';
import createArgument from './create-argument';
import createVariableRef from './create-variable-ref';

import type { IntegrationDependencies } from '../../src/types/language-integration/integration-dependencies';
import type { Renderers } from '../../src/types/language-integration/renderers';

export default (
  integrationDependencies: IntegrationDependencies,
): Renderers => {
  return {
    booleanLiteral: createBooleanLiteral(integrationDependencies),
    functionCall: createFunctionCall(integrationDependencies),
    functionDefinition: createFunctionDefinition(integrationDependencies),
    functionParameter: createFunctionParameter(integrationDependencies),
    argument: createArgument(integrationDependencies),
    variableRef: createVariableRef(integrationDependencies),
  };
};
