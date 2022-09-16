import Syno from 'perhaps-foliage/dist/main-process/state-interface/syntactic-interface/readable/syno';

import BooleanLiteral from './boolean-literal';
import FunctionCall from './function-call';
import FunctionDefinition from './function-definition';
import VariableRef from './variable-ref';

import { Expression } from '../types/synos/expression';

export default (syno: Syno): Expression => {
  switch (syno.type) {
    case 'booleanLiteral': {
      return new BooleanLiteral(syno.id, syno.tree);
    }

    case 'functionCall': {
      return new FunctionCall(syno.id, syno.tree);
    }

    case 'functionDefinition': {
      return new FunctionDefinition(syno.id, syno.tree);
    }

    case 'variableRef': {
      return new VariableRef(syno.id, syno.tree);
    }

    default: {
      throw new Error();
    }
  }
};
