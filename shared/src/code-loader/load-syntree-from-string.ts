// import graphValidator from './graph-validator';
import grammarValidator from './grammar-validator';
import type { SynoMap } from '../types/syntactic/syno-map';
import type { CoresideLanguageIntegration } from '../types/language-integration/coreside-language-integration';

const validateSyntax = (graphName, graph, grammarName, grammar) => {
  const grammarValidatorRez = grammarValidator(grammar);

  if (!grammarValidatorRez.valid) {
    throw new Error(
      `Validation of graph '${graphName}' failed under grammar '${grammarName}': ${grammarValidatorRez.message}`,
    );
  } // const graphValidationRez = graphValidator(graph, grammar, grammarName);
  // if (!graphValidationRez.valid) {
  //  throw new Error(
  //   `Validation of graph '${graphName}' `
  //   + `failed under grammar '${grammarName}': ${graphValidationRez.message}`
  //  );
  // }
};

export default (fileText: string, integration: CoresideLanguageIntegration): Promise<SynoMap> => {
  const newSyntree = JSON.parse(fileText);
  validateSyntax('loaded_file', newSyntree, 'saliva', integration.grammar);
  return newSyntree;
};
