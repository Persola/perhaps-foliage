import Argument from '../../synos/argument';
import BooleanLiteral from '../../synos/boolean-literal';
import FunctionCall from '../../synos/function-call';
import FunctionDefinition from '../../synos/function-definition';
import FunctionParameter from '../../synos/function-parameter';
import VariableRef from '../../synos/variable-ref';

export type SalivaType = (
  | Argument
  | BooleanLiteral
  | FunctionCall
  | FunctionDefinition
  | FunctionParameter
  | VariableRef
);
