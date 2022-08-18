import * as Ajv from 'ajv';

import invalidate from './graph-validator/invalidate';
import syntypeSchemaSchema from './schemas/syntype-schema-schema';

import type { SyntypeSchema } from '../../types/syntype-schema/syntype-schema';
import type { ValidationResult } from '../../types/code-loader/validation-result';

const grammarValidator = (syntypeSchema: SyntypeSchema): ValidationResult => {
  const result = {
    valid: true,
    messages: [],
  };

  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    validateSchema: true,
  });

  const validateGrammar = ajv.compile(syntypeSchemaSchema);
  if (!validateGrammar(syntypeSchema)) {
    invalidate(result, validateGrammar.errors.map(e => `${e.dataPath} ${e.message}`));
    return result;
  }

  // validate nonTreeRefs match syntypes
  Object.entries(syntypeSchema).forEach(([syntypeName, syntypeEntry]): void => {
    Object.entries(syntypeEntry.nonTreeRefs).forEach(([edgeLabel, referentSyntype]): void => {
      if (!Object.keys(syntypeSchema).includes(referentSyntype)) {
        invalidate(result, (
          `Syntype '${syntypeName}' has non-tree ref '${edgeLabel}'`
          + ` to missing syntype '${referentSyntype}'`
        ));
      }
    });
  });

  if (!result.valid) {
    return result;
  }

  // validate texthost refs have names to read
  Object.entries(syntypeSchema).forEach(([syntypeName, syntypeEntry]): void => {
    const textHostSyntype = syntypeEntry.nonTreeRefs.textHost;
    if (typeof textHostSyntype === 'string') {
      const hostSyntypeEntry = syntypeSchema[textHostSyntype];
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
  syntypeSchema: SyntypeSchema,
  schemaName: string,
): void => {
  let grammarValidatorRez;
  try {
    grammarValidatorRez = grammarValidator(syntypeSchema);
  } catch (error) {
    throw new Error(
      `Syntype schema validation failed with unanticipated error:\n${error.message}`,
    );
  }

  if (!grammarValidatorRez.valid) {
    throw new Error(
      `Validation of syntype schema '${schemaName}' failed:\n${grammarValidatorRez.messages.join('\n')}`,
    );
  }
};
