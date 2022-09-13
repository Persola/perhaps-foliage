export default {
  type: 'object',
  additionalProperties: false,
  patternProperties: {
    '^.*$': {
      type: 'object',
      additionalProperties: false,
      properties: {
        properties: {
          type: 'object',
          additionalProperties: false,
          // per property the syntactic type can have
          patternProperties: { '^.*$': { type: 'string' } },
        },
        extratreeRefs: {
          type: 'object',
          additionalProperties: false,
          // per extratree reference the syntactic type can have
          patternProperties: { '^.*$': { type: 'string' } },
        },
      },
    },
  },
};
