import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syno';

import Argument from './argument';
import BooleanLiteral from './boolean-literal';
import FunctionCall from './function-call';
import FunctionDefinition from './function-definition';
import FunctionParameter from './function-parameter';
import VariableRef from './variable-ref';

import { SalivaType } from '../types/synos/saliva-type';

export default (syno: Syno): SalivaType => {
  switch (syno.type) {
    case 'argument': {
      return new Argument(syno.id, syno.tree);
    }

    case 'booleanLiteral': {
      return new BooleanLiteral(syno.id, syno.tree);
    }

    case 'functionCall': {
      return new FunctionCall(syno.id, syno.tree);
    }

    case 'functionDefinition': {
      return new FunctionDefinition(syno.id, syno.tree);
    }

    case 'functionParameter': {
      return new FunctionParameter(syno.id, syno.tree);
    }

    case 'variableRef': {
      return new VariableRef(syno.id, syno.tree);
    }

    default: {
      throw new Error();
    }
  }
};
