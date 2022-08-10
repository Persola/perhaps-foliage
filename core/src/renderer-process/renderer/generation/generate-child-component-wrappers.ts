import * as React from 'react';
import Text from '../components/vis/text';
import completeInstruction from './complete-instruction';
import childPresnoComponent from './child-presno-component';

import type { PresnoRef } from '../../../types/presenter/presno-ref';
import type { childPresnoInstruction } from '../../../types/language-integration/renderers/child-presno-instruction';
import type { childPresnoFullInstruction } from '../../../types/language-integration/renderers/child-presno-full-instruction';
import type { SharedRendererProps } from '../../../types/renderer/shared-renderer-props';
import type { ComponentOrVectorComponent } from '../../../types/renderer/component-or-vector-component';
import type { GrammarSyntypeEntry } from '../../../types/grammar/syntype';

const childPresnoGenerator = (
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
        return childPresnoComponent(parentProps, childRef);
      });
    };
  }

  return (parentProps: SharedRendererProps) => {
    // @ts-ignore promised by grammar
    const val: (PresnoRef | null) = parentProps.presno[instruction.attr];

    if (val === undefined) {
      console.warn(
        `Skipping rendering of syno (${parentProps.presno.id}) attr '${instruction.attr}'`
        + ' for lack of a child presno reference',
      );
      return null;
    }

    if (val === null) {
      return null;
    }

    return childPresnoComponent(parentProps, val);
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
  const childComponentsGenerators = [];

  for (const instruction of instructions) {
    const fullInstruction = completeInstruction(instruction);

    if (fullInstruction.as === 'presno') {
      // we assume the presentation data is already valid against the grammar
      // which, since it's presentational, not syntactic, means we assume
      // there is a synPresnos per presented syno
      const isCollection = !!(syntypeGrammarEntry.children[fullInstruction.attr]?.collection);

      childComponentsGenerators.push(
        childPresnoGenerator(fullInstruction, isCollection),
      );
    } else {
      childComponentsGenerators.push(
        nonPresnoGenerator(fullInstruction),
      );
    }
  }

  return childComponentsGenerators;
};
