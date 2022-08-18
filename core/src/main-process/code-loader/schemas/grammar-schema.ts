export default {
  type: 'object',
  additionalProperties: false,
  properties: {
    nonTerminals: {
      type: 'array',
      items: { type: 'string' },
    },
    terminals: {
      type: 'array',
      items: { type: 'string' },
    },
    startingNonTerminal: { type: 'string' },
    productionRules: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          lhs: { type: 'string' },
          rhs: {
            type: 'object',
            additionalProperties: false,
            properties: {
              parent: { type: 'string' },
              children: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    edgeLabel: { type: 'string' },
                    childNonTerminal: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
