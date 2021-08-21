export default {
  type: 'object',
  additionalProperties: false,
  patternProperties: {
    '^.*$': {
      type: 'object',
      properties: {
        rootable: { type: 'boolean' },
        textHostRef: { type: ['null', 'string'] },
        children: {
          type: 'object',
          additionalProperties: false,
          patternProperties: {
            '^.*$': {
              type: 'object',
              properties: {
                collection: { type: 'boolean' },
                syntype: {
                  oneOf: [
                    { type: 'string' },
                    {
                      type: 'array',
                      items: { type: 'string' }
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
