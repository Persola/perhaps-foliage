// @noflow because requires don't fit their types
import type { Syno } from '../types/syno';
import type { FunctionCall } from '../types/synos/function-call.js'

import graphValidator from './graph-validator.js'
import grammarValidator from './grammar-validator.js'

const salivaGrammar: FunctionCall = require('../extension-staging-area/saliva/grammar.yml');
const salivaPrimitives: FunctionCall = require('../extension-staging-area/saliva/primitives.yml');
const pantheonGrammar: FunctionCall = require('../extension-staging-area/pantheon/grammar.yml');

const falseLiteral: FunctionCall = require('../extension-staging-area/saliva/static/false-literal.yml');
const proxyNorCall: FunctionCall = require('../extension-staging-area/saliva/static/proxy-nor-call.yml');
const pantheon: FunctionCall = require('../extension-staging-area/pantheon/static/pantheon.yml');

const validateSyntax = (graphName, graph, grammarName, grammar) => {
  const grammarValidatorRez = grammarValidator(grammar);
  if (!grammarValidatorRez.valid) {
    throw new Error(`Validation of graph '${graphName}' failed under grammar '${grammarName}': ${grammarValidatorRez.message}`);
  }

  const graphValidationRez = graphValidator(graph, grammar, grammarName);
  if (!graphValidationRez.valid) {
    throw new Error(`Validation of graph '${graphName}' failed under grammar '${grammarName}': ${graphValidationRez.message}`);
  }
};

export default (name: string): Syno => {
  switch (name) {
    case 'salivaPrimitives': {
      validateSyntax(name, salivaPrimitives, 'saliva', salivaGrammar);
      return salivaPrimitives;
    }
    case 'falseLiteral': {
      validateSyntax(name, falseLiteral, 'saliva', salivaGrammar);
      return falseLiteral;
    }
    case 'proxyNorCall': {
      validateSyntax(name, proxyNorCall, 'saliva', salivaGrammar);
      return proxyNorCall;
    }
    case 'pantheon': {
      validateSyntax(name, pantheon, 'pantheon', pantheonGrammar);
      return pantheon;
    }
    default: {
      throw new Error('code load failed: requested graph does not exist');
    }
  }
};
