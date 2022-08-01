import type { JSONSchema7Type } from 'json-schema';

import synoRefSchema from './syno-ref';
import syntypeProps from './syntype-props';

import type { Grammar } from '../../../types/grammar/grammar';

// compare: types/syntactic/syno

export default (grammar: Grammar): JSONSchema7Type => {
  return {
    oneOf: Object.entries(grammar).map(([syntype, syntypeGrammarEntry]) => {
      const syntypeSpecificProperties = syntypeProps(syntypeGrammarEntry);
      return {
        type: 'object',
        required: [
          'id',
          'syntype',
          'parent',
          ...Object.keys(syntypeSpecificProperties),
        ],
        additionalProperties: false,
        properties: {
          id: { type: 'string' },
          syntype: { const: syntype },
          parent: synoRefSchema('parent'),
          ...syntypeSpecificProperties,
        },
      };
    }),
  };
};
