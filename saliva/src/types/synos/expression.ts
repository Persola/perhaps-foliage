import BooleanLiteral from '../../synos/boolean-literal';
import FunctionCall from '../../synos/function-call';
import FunctionDefinition from '../../synos/function-definition';
import VariableRef from '../../synos/variable-ref';

export type Expression = (
  | BooleanLiteral
  | FunctionCall
  | FunctionDefinition
  | VariableRef
);
