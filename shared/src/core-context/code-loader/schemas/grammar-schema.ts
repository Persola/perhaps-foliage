export default {
  type: 'object',
  additionalProperties: false,
  patternProperties: {
    '^.*$': {
      type: 'object',
      additionalProperties: false,
      properties: {
        rootable: { type: 'boolean' },
        properties: {
          type: 'object',
          additionalProperties: false,
          patternProperties: { '^.*$': { type: 'string' } },
        },
        nonTreeRefs: {
          type: 'object',
          additionalProperties: false,
          patternProperties: { '^.*$': { type: 'string' } },
        },
        children: {
          type: 'object',
          additionalProperties: false,
          patternProperties: {
            '^.*$': {
              type: 'object',
              additionalProperties: false,
              properties: {
                collection: { type: 'boolean' },
                syntype: {
                  oneOf: [
                    { type: 'string' },
                    {
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
