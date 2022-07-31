import * as React from 'react';

import generateChildComponentWrappers from './generate-child-component-wrappers';

import type { RendererAttrs } from '../../../types/language-integration/renderer-attrs';
import type { Renderer } from '../../../types/language-integration/renderer';
import type { SharedRendererProps } from '../../../types/renderer/shared-renderer-props';
import type { GrammarSyntypeEntry } from '../../../types/grammar/grammar-syntype-entry';
import type { ComponentOrVectorComponent } from '../../../types/renderer/component-or-vector-component';

export default (
  attrs: RendererAttrs,
  syntypeGrammarEntry: GrammarSyntypeEntry,
): Renderer => {
  const {
    classes: syntypeClasses,
    childPresnos: childPresnosInstructions,
  } = attrs;

  const childComponentWrappers: ComponentOrVectorComponent[] = generateChildComponentWrappers(
    childPresnosInstructions,
    syntypeGrammarEntry,
  );

  return (props: SharedRendererProps) => {
    // TODO: check props (b/c they aren't typed anymore), ideally against provided presenter
    // TODO: check presno.syntype

    const {
      presno: { focused, valid, synoId },
    } = props;

    const classes = syntypeClasses.concat([
      'syno',
      focused ? 'focused' : 'unfocused',
      valid ? '' : 'invalid',
    ]);

    const childComponents = childComponentWrappers.map(gen => gen(props)).flat();

    return React.createElement(
      'div',
      {
        className: classes.join(' '),
        'data-syno-id': synoId,
      },
      ...childComponents,
    );
  };
};
