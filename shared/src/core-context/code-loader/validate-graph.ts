import * as Ajv from 'ajv';

import synoMap from './schemas/syno-map';
import transformAjvErrors from './graph-validator/transform-ajv-errors';
import invalidate from './graph-validator/invalidate';
import updateResult from './graph-validator/update-result';
import validateMapKeysMatchIds from './graph-validator/validate-map-keys-match-ids';
import validateTreeStructure from './graph-validator/validate-tree-structure';
import validateNonTreeDependencies from './graph-validator/validate-non-tree-dependencies';

import type { SynoMap } from '../../types/syntactic/syno-map';
import type { Grammar } from '../../types/grammar/grammar';
import type { GraphValidationResult } from '../../types/code-loader/graph-validation-result';

const graphValidator = (
  graph: unknown,
  grammar: Grammar,
  primitives: SynoMap,
): GraphValidationResult => {
  const result = {
    valid: true,
    messages: [],
  };

  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    validateSchema: true,
  });

  // validate form of each local part of the graph independantly
  const synoMapSchema = synoMap(grammar) as object; // eslint-disable-line
  const validateGraphUnderLanguageGrammar = ajv.compile(synoMapSchema);
  const matchesSchema = validateGraphUnderLanguageGrammar(graph);

  if (!matchesSchema) {
    invalidate(
      result,
      transformAjvErrors(
        validateGraphUnderLanguageGrammar.errors,
        synoMapSchema,
        graph,
        grammar,
      ),
    );

    return result; // from here on, rely on graph matching schema
  }

  const contextlesslyValidGraph: SynoMap = (graph as SynoMap); // known from local validation

  updateResult(
    result,
    validateMapKeysMatchIds(contextlesslyValidGraph),
  );
  if (!result.valid) {
    return result; // from here on, rely on IDs
  }

  updateResult(
    result,
    validateTreeStructure(contextlesslyValidGraph, grammar, primitives),
  );
  updateResult(
    result,
    validateNonTreeDependencies(contextlesslyValidGraph, grammar, primitives),
  );

  return result;
};

export default (
  graphName: string,
  graph: unknown,
  grammarName: string,
  grammar: Grammar,
  primitives: SynoMap,
): void => {
  const graphValidationRez = graphValidator(graph, grammar, primitives);
  if (!graphValidationRez.valid) {
    throw new Error(
      `Validation of graph '${graphName}' failed under grammar '${grammarName}'`
      + `\n${graphValidationRez.messages.join('\n')}`,
    );
  }
};
