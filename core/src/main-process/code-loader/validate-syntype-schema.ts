import * as Ajv from 'ajv';

import invalidate from './graph-validator/invalidate';
import syntacticTypeSchemaSchema from './schemas/syntactic-type-schema-schema';

import type { SyntacticTypeSchema } from '../../types/language-integration/syntactic-type-schema/syntactic-type-schema';
import type { ValidationResult } from '../../types/code-loader/validation-result';

const grammarValidator = (syntacticTypeSchema: SyntacticTypeSchema): ValidationResult => {
  const result = {
    valid: true,
    messages: [],
  };

  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    validateSchema: true,
  });

  const validateGrammar = ajv.compile(syntacticTypeSchemaSchema);
  if (!validateGrammar(syntacticTypeSchema)) {
    invalidate(result, validateGrammar.errors.map(e => `${e.dataPath} ${e.message}`));
    return result;
  }

  // validate extratreeRefs match syntypes
  Object.entries(syntacticTypeSchema).forEach(([syntypeName, syntypeEntry]): void => {
    Object.entries(syntypeEntry.extratreeRefs).forEach(([edgeLabel, referentSyntype]): void => {
      if (!Object.keys(syntacticTypeSchema).includes(referentSyntype)) {
        invalidate(result, (
          `Syntype '${syntypeName}' has extratree ref '${edgeLabel}'`
          + ` to missing syntype '${referentSyntype}'`
        ));
      }
    });
  });

  if (!result.valid) {
    return result;
  }

  // validate texthost refs have names to read
  Object.entries(syntacticTypeSchema).forEach(([syntypeName, syntypeEntry]): void => {
    const textHostSyntype = syntypeEntry.extratreeRefs.textHost;
    if (typeof textHostSyntype === 'string') {
      const hostSyntypeEntry = syntacticTypeSchema[textHostSyntype];
      if (!Object.keys(hostSyntypeEntry.attrs).includes('name')) {
        invalidate(result, (
          `Syntype '${syntypeName}' has textHost ref of syntype '${textHostSyntype}'`
          + ` but ${textHostSyntype} has no property named 'name'`
        ));
      } else if (hostSyntypeEntry.attrs.name !== 'string') {
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
  syntacticTypeSchema: SyntacticTypeSchema,
  schemaName: string,
): void => {
  let grammarValidatorRez;
  try {
    grammarValidatorRez = grammarValidator(syntacticTypeSchema);
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
