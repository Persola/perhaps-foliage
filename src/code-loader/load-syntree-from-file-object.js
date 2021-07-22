// @flow
import graphValidator from './graph-validator';
// import grammarValidator from './grammar-validator';

import type { SynoMap } from '../types/syno-map';

import salivaGrammar from '../extension-staging-area/saliva/grammar.yml';

const validateSyntax = (graphName, graph, grammarName, grammar) => {
  const grammarValidatorRez = grammarValidator(grammar);
  if (!grammarValidatorRez.valid) {
    throw new Error(`Validation of graph '${graphName}' failed under grammar '${grammarName}': ${grammarValidatorRez.message}`);
  }

  // const graphValidationRez = graphValidator(graph, grammar, grammarName);
  // if (!graphValidationRez.valid) {
    // throw new Error(
    //   `Validation of graph '${graphName}' failed under grammar '${grammarName}': ${graphValidationRez.message}`
    // );
  // }
};

export default (file: File): Promise<SynoMap> => {
  return file.text().then(fileText => {
    const newSyntree = JSON.parse(fileText);
    validateSyntax('loaded_file', newSyntree, 'saliva', salivaGrammar);
    return newSyntree;
  });
};
