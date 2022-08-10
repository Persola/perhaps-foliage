import * as React from 'react';
import Text from '../components/vis/text';
import completeInstruction from './complete-instruction';
import childComponent from './child-component';

import type { PresnoRef } from '../../../types/presenter/presno-ref';
import type { childPresnoInstruction } from '../../../types/language-integration/renderers/child-presno-instruction';
import type { childPresnoFullInstruction } from '../../../types/language-integration/renderers/child-presno-full-instruction';
import type { SharedRendererProps } from '../../../types/renderer/shared-renderer-props';
import type { ComponentOrVectorComponent } from '../../../types/renderer/component-or-vector-component';
import type { GrammarSyntypeEntry } from '../../../types/grammar/grammar-syntype-entry';

const presnoGenerator = (
  instruction: childPresnoFullInstruction,
  isCollection: boolean,
): ComponentOrVectorComponent => {
  if (isCollection) {
    return (parentProps: SharedRendererProps) => {
      // @ts-ignore promised by grammar
      const val: (PresnoRef[] | null) = parentProps.presno[instruction.attr];

      if (val === null) {
        return null;
      }

      return val.map(childRef => {
        return childComponent(parentProps, childRef);
      });
    };
  }

  return (parentProps: SharedRendererProps) => {
    // @ts-ignore promised by grammar
    const val: (PresnoRef | null) = parentProps.presno[instruction.attr];

    if (val === null) {
      return null;
    }

    return childComponent(parentProps, val);
  };
};

const nonPresnoGenerator = (
  instruction: childPresnoFullInstruction,
): ComponentOrVectorComponent => {
  return (parentProps: SharedRendererProps) => {
    const { presno } = parentProps;
    const textVal = presno[instruction.attr];

    if (textVal === null) {
      return null;
    }

    return React.createElement(
      Text,
      { text: String(textVal) },
    );
  };
};

export default (
  instructions: childPresnoInstruction[],
  syntypeGrammarEntry: GrammarSyntypeEntry,
): ComponentOrVectorComponent[] => {
  const componentsGenerators = [];

  for (const instruction of instructions) {
    const fullInstruction = completeInstruction(instruction);

    if (fullInstruction.as === 'presno') {
      // we assume the presentation data is already valid against the grammar
      // which, since it's presentational, not syntactic, means we assume
      // there is a synPresnos per presented syno
      const isCollection = !!(syntypeGrammarEntry.children[fullInstruction.attr]?.collection);

      componentsGenerators.push(
        presnoGenerator(fullInstruction, isCollection),
      );
    } else {
      componentsGenerators.push(
        nonPresnoGenerator(fullInstruction),
      );
    }
  }

  return componentsGenerators;
};
