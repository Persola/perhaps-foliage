// @flow
import type { IntegrationDependencies } from '../../../types/language-integration/integration-dependencies';
import type { BooleanLiteralRendererProps } from '../types/renderers/boolean-literal-props';

export default (integrationDependencies: IntegrationDependencies): any => {
  const { React, components: { NamePart } } = integrationDependencies;

  return (props: BooleanLiteralRendererProps) => {
    const { presno } = props;
    const { valid } = presno;
    if (presno.syntype !== 'booleanLiteral') {
      throw new Error('non-boolean masquerading as boolean');
    }

    const classes = [
      'syno',
      'same-line',
      'leaf',
      'bubble-even',
      'boolean-literal',
      (presno.focused ? 'focused' : 'unfocused'),
      (valid ? '' : 'invalid'),
    ].join(' ');

    return React.createElement(
      'div',
      {
        className: classes,
        'data-syno-id': presno.synoId,
      },
      React.createElement(
        NamePart,
        {
          namePart: String(presno.value),
          focused: null,
          charFocused: null,
        },
      ),
    );
  };
};
