export default {
  type: 'object',
  additionalProperties: false,
  patternProperties: {
    // per syntype that can appear under the grammar
    '^.*$': {
      type: 'object',
      additionalProperties: false,
      properties: {
        properties: {
          type: 'object',
          additionalProperties: false,
          // per property the syntype can have
          patternProperties: { '^.*$': { type: 'string' } },
        },
        nonTreeRefs: {
          type: 'object',
          additionalProperties: false,
          // per nonTreeRef relation the syntype can have
          patternProperties: { '^.*$': { type: 'string' } },
        },
      },
    },
  },
};
