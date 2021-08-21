import type { JSONSchema7Type } from 'json-schema';

import synoSchema from './syno';

import type { Grammar } from '../../../types/grammar/grammar';

// compare: types/syntactic/syno-map

export default (grammar: Grammar): JSONSchema7Type => {
  return {
    type: 'object',
    additionalProperties: false,
    patternProperties: {
      '^.*$': synoSchema(grammar),
    },
  };
};
