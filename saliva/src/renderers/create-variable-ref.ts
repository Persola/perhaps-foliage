import type { IntegrationDependencies } from 'saliva-repl/dist/types/language-integration/integration-dependencies';
import type { VariableRefRendererProps } from '../types/renderers/variable-ref-props';

export default (
  integrationDependencies: IntegrationDependencies,
): (
  (props: VariableRefRendererProps) => JSX.Element
) => {
  const { React } = integrationDependencies;

  return (props: VariableRefRendererProps) => {
    const {
      integration,
      getPresno,
      presno,
      PresnoRenderer,
    } = props;
    const { valid } = presno;
    const classes = [
      'syno',
      'same-line',
      'leaf',
      'bubble-even',
      'variable-ref',
      presno.focused ? 'focused' : 'unfocused',
      valid ? '' : 'invalid',
    ].join(' ');

    return React.createElement(
      'div',
      {
        className: classes,
        'data-syno-id': presno.synoId,
      },
      presno.name && React.createElement(PresnoRenderer, {
        integration,
        getPresno,
        synoId: presno.name.id,
        PresnoRenderer,
      }),
    );
  };
};
