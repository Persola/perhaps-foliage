import type { JSONSchema7Type } from 'json-schema';

import synoRef from './syno-ref';

import type { GrammarSyntypeEntry } from '../../../types/grammar/grammar-syntype-entry';

type ChildRelationEntry = { collection: boolean };

export default (syntypeGrammarEntry: GrammarSyntypeEntry): Record<string, JSONSchema7Type> => {
  const props = {};

  Object.entries(syntypeGrammarEntry.children).forEach(
    ([childRelationName, childRelationEntry]) => {
      props[childRelationName] = !(childRelationEntry as ChildRelationEntry).collection
        ? synoRef('child')
        : {
          type: 'array',
          items: synoRef('child'),
        };
    },
  );

  syntypeGrammarEntry.nonTreeRefs.forEach(nonTreeRefName => {
    props[nonTreeRefName] = synoRef('non-tree');
  });

  Object.entries(syntypeGrammarEntry.properties).forEach(([propName, propType]) => {
    props[propName] = { type: propType };
  });

  return props;
};
