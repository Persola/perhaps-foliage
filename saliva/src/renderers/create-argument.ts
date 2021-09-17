import type { IntegrationDependencies } from 'saliva-repl/dist/types/language-integration/integration-dependencies';
import type { ArgumentRendererProps } from '../types/renderers/argument-props';

export default (
  integrationDependencies: IntegrationDependencies,
): (
  (props: ArgumentRendererProps) => JSX.Element
) => {
  const { React } = integrationDependencies;

  return (props: ArgumentRendererProps) => {
    const {
      integration,
      getPresno,
      PresnoRenderer,
      presno: {
        focused,
        synoId,
        name,
        value,
        valid,
      },
    } = props;
    const classes = [
      'syno',
      'same-line',
      'bubble-even',
      'argument',
      focused ? 'focused' : 'unfocused',
      valid ? '' : 'invalid',
    ].join(' ');

    return React.createElement(
      'div',
      {
        className: classes,
        'data-syno-id': synoId,
      },
      name && React.createElement(PresnoRenderer, {
        integration,
        getPresno,
        synoId: name.id,
        PresnoRenderer,
      }),
      value && React.createElement(PresnoRenderer, {
        integration,
        getPresno,
        synoId: value.id,
        PresnoRenderer,
      }),
    );
  };
};
