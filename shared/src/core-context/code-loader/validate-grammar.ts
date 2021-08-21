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
    invalidate(result, ajv.errorsText(validateGrammar.errors));
    return result;
  }

  // TODO: validate textHostRef by name property
  // requires grammar specifying syntype for textHostRef

  // Object.entries(grammar).forEach(([syntypeName, syntypeEntry]): void => {
  //   if (typeof syntypeEntry.textHostRef === 'string') {
  //     const hostSyntypeEntry = grammar[need text host syntype];
  //     if (!Object.values(hostSyntypeEntry.properties).includes('name')) {
  //       invalidate(result, (
  //         `Syntype '${syntypeName}' has textHostRef syntype '${syntypeEntry.textHostRef}'`
  //         + ` but ${syntypeEntry.textHostRef} has no property named 'name'`
  //       ));
  //     }
  //   }
  // });

  return result;
};

export default (
  grammar: Grammar,
  grammarName: string,
): void => {
  const grammarValidatorRez = grammarValidator(grammar);
  if (!grammarValidatorRez.valid) {
    throw new Error(
      `Validation of grammar '${grammarName}' failed:\n${grammarValidatorRez.messages.join('\n')}`,
    );
  }
};
