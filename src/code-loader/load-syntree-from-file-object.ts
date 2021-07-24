// import graphValidator from './graph-validator';
import grammarValidator from "./grammar-validator";
import type { SynoMap } from "../types/syno-map";

const validateSyntax = (graphName, graph, grammarName, grammar) => {
  const grammarValidatorRez = grammarValidator(grammar);

  if (!grammarValidatorRez.valid) {
    // @ts-ignore: why can't ts narrow this properly?
    throw new Error(`Validation of graph '${graphName}' failed under grammar '${grammarName}': ${grammarValidatorRez.message}`);
  } // const graphValidationRez = graphValidator(graph, grammar, grammarName);
  // if (!graphValidationRez.valid) {
  //   throw new Error(
  //     `Validation of graph '${graphName}' `
  //     + `failed under grammar '${grammarName}': ${graphValidationRez.message}`
  //   );
  // }

};

export default ((file: File, integration): Promise<SynoMap> => {
  return file.text().then(fileText => {
    const newSyntree = JSON.parse(fileText);
    validateSyntax('loaded_file', newSyntree, 'saliva', integration.grammar);
    return newSyntree;
  });
});