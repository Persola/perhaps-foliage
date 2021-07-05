// @flow
import type { SynoMap } from '../types/syno-map';

import graphValidator from './graph-validator.js';
import grammarValidator from './grammar-validator.js';

const salivaGrammar = require('../extension-staging-area/saliva/grammar.yml');
const salivaPrimitives = require('../extension-staging-area/saliva/primitives.yml');
const pantheonGrammar = require('../extension-staging-area/pantheon/grammar.yml');

const falseLiteral = require('../extension-staging-area/saliva/static/false-literal.yml');
const proxyNorCall = require('../extension-staging-area/saliva/static/proxy-nor-call.yml');
const pantheon = require('../extension-staging-area/pantheon/static/pantheon.yml');

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

export default (name: string): SynoMap => {
  switch (name) {
    case 'salivaPrimitives': {
      validateSyntax(name, salivaPrimitives, 'saliva', salivaGrammar);
      // $FlowFixMe: syntax validation is not satisfying flow
      return salivaPrimitives;
    }
    case 'falseLiteral': {
      validateSyntax(name, falseLiteral, 'saliva', salivaGrammar);
      // $FlowFixMe: syntax validation is not satisfying flow
      return falseLiteral;
    }
    case 'proxyNorCall': {
      validateSyntax(name, proxyNorCall, 'saliva', salivaGrammar);
      // $FlowFixMe: syntax validation is not satisfying flow
      return proxyNorCall;
    }
    case 'pantheon': {
      validateSyntax(name, pantheon, 'pantheon', pantheonGrammar);
      // $FlowFixMe: syntax validation is not satisfying flow
      return pantheon;
    }
    default: {
      throw new Error('code load failed: requested graph does not exist');
    }
  }
};
