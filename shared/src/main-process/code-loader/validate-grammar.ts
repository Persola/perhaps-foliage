import * as Ajv from 'ajv';

import invalidate from './graph-validator/invalidate';
import grammarSchema from './schemas/grammar-schema';

import type { Grammar } from '../../types/grammar/grammar';
import type { GraphValidationResult } from '../../types/code-loader/graph-validation-result';

const grammarValidator = (grammar: Grammar): GraphValidationResult => {
  const result = {
    valid: true,
    messages: [],
  };

  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    validateSchema: true,
  });

  const validateGrammar = ajv.compile(grammarSchema);
  const valid = validateGrammar(grammar);

  if (!valid) {
    invalidate(result, validateGrammar.errors.map(e => `${e.dataPath} ${e.message}`));
    return result;
  }

  // validate texthost refs have names to read
  Object.entries(grammar).forEach(([syntypeName, syntypeEntry]): void => {
    const textHostSyntype = syntypeEntry.nonTreeRefs.textHost;
    if (typeof textHostSyntype === 'string') {
      const hostSyntypeEntry = grammar[textHostSyntype];
      if (!Object.keys(hostSyntypeEntry.properties).includes('name')) {
        invalidate(result, (
          `Syntype '${syntypeName}' has textHost ref of syntype '${textHostSyntype}'`
          + ` but ${textHostSyntype} has no property named 'name'`
        ));
      } else if (hostSyntypeEntry.properties.name !== 'string') {
        invalidate(result, (
          `Syntype '${syntypeName}' has textHost ref syntype '${textHostSyntype}'`
          + ` but ${textHostSyntype}'s 'name' property is not typed as string`
        ));
      }
    }
  });

  return result;
};

export default (
  grammar: Grammar,
  grammarName: string,
): void => {
  let grammarValidatorRez;
  try {
    grammarValidatorRez = grammarValidator(grammar);
  } catch (error) {
    throw new Error(
      `Grammar validation failed with unanticipated error:\n${error.message}`,
    );
  }

  if (!grammarValidatorRez.valid) {
    throw new Error(
      `Validation of grammar '${grammarName}' failed:\n${grammarValidatorRez.messages.join('\n')}`,
    );
  }
};
