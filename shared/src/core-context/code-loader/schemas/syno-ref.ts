import type { JSONSchema7Type } from 'json-schema';

// compare: types/syntactic/syno-ref

export default (relation: ('parent' | 'child' | 'non-tree')): JSONSchema7Type => {
  const ref = {
    type: 'object',
    required: [
      'synoRef',
      'relation',
      'id',
    ],
    additionalProperties: false,
    properties: {
      synoRef: { const: true },
      relation: { const: relation },
      id: { type: 'string' },
    },
  };

  if (relation === 'parent') {
    return {
      oneOf: [
        { type: 'null' },
        ref,
      ],
    };
  }

  return ref;
};
