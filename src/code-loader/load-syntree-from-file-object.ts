// import graphValidator from './graph-validator';
import grammarValidator from './grammar-validator';
import type { SynoMap } from '../types/syntactic/syno-map';
import type { LanguageIntegration } from '../types/language-integration';

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

export default (file: File, integration: LanguageIntegration): Promise<SynoMap> => {
  return file.text().then(fileText => {
    const newSyntree = JSON.parse(fileText);
    validateSyntax('loaded_file', newSyntree, 'saliva', integration.grammar);
    return newSyntree;
  });
};
