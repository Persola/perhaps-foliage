// @flow
import type { SynoId } from '../../../types/syno-id';
import type { Argument } from '../types/synos/argument';
import type { BooleanLiteral } from '../types/synos/boolean-literal';
import type { FunctionCall } from '../types/synos/function-call';
import type { FunctionDefinition } from '../types/synos/function-definition';
import type { FunctionParameter } from '../types/synos/function-parameter';
import type { VariableRef } from '../types/synos/variable-ref';

export default {
  getArgument: function getArgument(argId: SynoId): Argument {
    const arg = this.getSyno(argId);
    if (arg.syntype !== 'argument') {
      throw new Error('fetched syno was not an argument');
    }
    return arg;
  },
  getBooleanLiteral: function getBooleanLiteral(booleanLiteralId: SynoId): BooleanLiteral {
    const booleanLiteral = this.getSyno(booleanLiteralId);
    if (booleanLiteral.syntype !== 'booleanLiteral') {
      throw new Error('fetched syno was not a boolean literal');
    }
    return booleanLiteral;
  },
  getFunctionCall: function getFunctionCall(functionCallId: SynoId): FunctionCall {
    const functionCall = this.getSyno(functionCallId);
    if (functionCall.syntype !== 'functionCall') {
      throw new Error('fetched syno was not a function call');
    }
    return functionCall;
  },
  getFunctionDefinition: function getFunctionDefinition(
    functionDefinitionId: SynoId,
  ): FunctionDefinition {
    const functionDefinition = this.getSyno(functionDefinitionId);
    if (functionDefinition.syntype !== 'functionDefinition') {
      throw new Error('fetched syno was not a function definition');
    }
    return functionDefinition;
  },
  getFunctionParameter: function getFunctionParameter(
    functionParameterId: SynoId,
  ): FunctionParameter {
    const functionParameter = this.getSyno(functionParameterId);
    if (functionParameter.syntype !== 'functionParameter') {
      throw new Error('fetched syno was not a function parameter');
    }
    return functionParameter;
  },
  getVariableRef: function getVariableRef(variableRefId: SynoId): VariableRef {
    const variableRef = this.getSyno(variableRefId);
    if (variableRef.syntype !== 'variableRef') {
      throw new Error('fetched syno was not a variable reference');
    }
    return variableRef;
  },
};
