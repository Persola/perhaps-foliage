import createBooleanLiteral from "./create-boolean-literal";
import createFunctionCall from "./create-function-call";
import createFunctionDefinition from "./create-function-definition";
import createFunctionParameter from "./create-function-parameter";
import createArgument from "./create-argument";
import createVariableRef from "./create-variable-ref";
import type { IntegrationDependencies } from "../../../types/language-integration/integration-dependencies";
import type { Renderers } from "../../../types/language-integration/renderers";
export default (
  integrationDependencies: IntegrationDependencies
): Renderers => {
  return {
    // $FlowFixMe: editor vs. integration type specificy mismatch
    booleanLiteral: createBooleanLiteral(integrationDependencies),
    // $FlowFixMe: editor vs. integration type specificy mismatch
    functionCall: createFunctionCall(integrationDependencies),
    // $FlowFixMe: editor vs. integration type specificy mismatch
    functionDefinition: createFunctionDefinition(integrationDependencies),
    // $FlowFixMe: editor vs. integration type specificy mismatch
    functionParameter: createFunctionParameter(integrationDependencies),
    // $FlowFixMe: editor vs. integration type specificy mismatch
    argument: createArgument(integrationDependencies),
    // $FlowFixMe: editor vs. integration type specificy mismatch
    variableRef: createVariableRef(integrationDependencies),
  };
};
