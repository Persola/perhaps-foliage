import * as React from 'react';
import Text from '../components/vis/text';

import type { PresnoRef } from '../../../types/presenter/presno-ref';
import type { childPresnoInstruction } from '../../../types/language-integration/child-presno-instruction';
import type { childPresnoFullInstruction } from '../../../types/language-integration/child-presno-full-instruction';
import type { SharedRendererProps } from '../../../types/renderer/shared-renderer-props';
import type { ComponentOrVectorComponent } from '../../../types/renderer/component-or-vector-component';
import type { GrammarSyntypeEntry } from '../../../types/grammar/grammar-syntype-entry';

const childComponent = (parentProps: SharedRendererProps, presnoRef: PresnoRef) => {
  const {
    PresnoRenderer,
    integration,
    getPresno,
  } = parentProps;

  return React.createElement(PresnoRenderer, {
    integration,
    getPresno,
    synoId: presnoRef.id,
    PresnoRenderer,
    key: presnoRef.id,
  });
};

const generatorsForIntruction = (
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

const completeInstruction = (
  instruction: childPresnoInstruction,
): childPresnoFullInstruction => {
  if (typeof instruction === 'object') {
    return instruction;
  }

  if (typeof instruction === 'string') {
    return {
      attr: instruction,
      as: 'string',
    };
  }

  throw new TypeError('Received child presno renderering instruction of unrecognized form');
};

export default (
  instructions: childPresnoInstruction[],
  syntypeGrammarEntry: GrammarSyntypeEntry,
  isSalivaBooleanLiteral: boolean,
): ComponentOrVectorComponent[] => {
  const componentsGenerators = [];

  if (isSalivaBooleanLiteral) {
    componentsGenerators.push(
      (parentProps: SharedRendererProps) => {
        return React.createElement(
          Text,
          { text: String(parentProps.presno.value) },
        );
      },
    );
  } else {
    for (const instruction of instructions) {
      const fullInstruction = completeInstruction(instruction);
      // we assume the pressentation data is already valid against the grammar
      // which, since it's presentational, not syntactic, means we assume
      // there is a synPresnos per presented syno
      const isCollection = !!(syntypeGrammarEntry.children[fullInstruction.attr]?.collection);

      componentsGenerators.push(
        generatorsForIntruction(fullInstruction, isCollection),
      );
    }
  }

  return componentsGenerators;
};
