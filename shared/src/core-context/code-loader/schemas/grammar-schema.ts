export default {
  type: 'object',
  additionalProperties: false,
  patternProperties: {
    // per syntype that can appear under the grammar
    '^.*$': {
      type: 'object',
      additionalProperties: false,
      properties: {
        rootable: { type: 'boolean' },
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
        children: {
          type: 'object',
          additionalProperties: false,
          patternProperties: {
            // per syntactical child relation the syntype can have
            '^.*$': {
              type: 'object',
              additionalProperties: false,
              properties: {
                collection: { type: 'boolean' }, // is the child relation singular or a collection
                syntype: { // syntype the children can have under the relation
                  oneOf: [
                    { type: 'string' }, // when the child is always one type
                    { // when the children can (individually) have one of multiple types
                      type: 'array',
                      items: { type: 'string' },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
};
