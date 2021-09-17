import type { IntegrationDependencies } from 'saliva-repl/dist/types/language-integration/integration-dependencies';
import type { FunctionParameterRendererProps } from '../types/renderers/function-parameter-props';

export default (
  integrationDependencies: IntegrationDependencies,
): (
  (props: FunctionParameterRendererProps) => JSX.Element
) => {
  const { React } = integrationDependencies;

  return (props: FunctionParameterRendererProps) => {
    const {
      integration,
      getPresno,
      presno,
      presno: {
        focused,
        valid,
      },
      PresnoRenderer,
    } = props;
    const classes = [
      'syno',
      'same-line',
      'leaf',
      'bubble-even',
      'function-parameter',
      focused ? 'focused' : 'unfocused',
      valid ? '' : 'invalid',
    ].join(' ');

    return React.createElement(
      'div',
      {
        className: classes,
        'data-syno-id': presno.synoId,
      },
      presno.slot && React.createElement(PresnoRenderer, {
        integration,
        getPresno,
        synoId: presno.slot.id,
        PresnoRenderer,
      }),
    );
  };
};
