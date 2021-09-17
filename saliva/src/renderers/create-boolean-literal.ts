import type { IntegrationDependencies } from 'saliva-repl/dist/types/language-integration/integration-dependencies';

import type { BooleanLiteralRendererProps } from '../types/renderers/boolean-literal-props';

export default (
  integrationDependencies: IntegrationDependencies,
): (
  (props: BooleanLiteralRendererProps) => JSX.Element
) => {
  const {
    React,
    components: { Text },
  } = integrationDependencies;

  return (props: BooleanLiteralRendererProps) => {
    const {
      presno,
      presno: { valid },
    } = props;

    if (presno.syntype !== 'booleanLiteral') {
      throw new Error('non-boolean masquerading as boolean');
    }

    const classes = [
      'syno',
      'same-line',
      'leaf',
      'bubble-even',
      'boolean-literal',
      presno.focused ? 'focused' : 'unfocused',
      valid ? '' : 'invalid',
    ].join(' ');

    return React.createElement(
      'div',
      {
        className: classes,
        'data-syno-id': presno.synoId,
      },
      React.createElement(Text, {
        text: String(presno.value),
      }),
    );
  };
};
