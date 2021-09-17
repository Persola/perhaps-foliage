import type { PresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/present-language-integration';
import type { Presno } from 'saliva-repl/dist/types/presenter/presno';
import type { SynoId } from 'saliva-repl/dist/types/syntactic/syno-id';
import type { PresnoRendererProps } from 'saliva-repl/dist/types/renderer/presno-renderer-props';
import type { IntegrationDependencies } from 'saliva-repl/dist/types/language-integration/integration-dependencies';
import type { TitanPres } from '../types/presentations/titan';

type Props = {
  integration: PresentLanguageIntegration;
  getPresno: (synoId: SynoId) => Presno;
  presno: TitanPres;
  PresnoRenderer: (props: PresnoRendererProps) => JSX.Element;
};

type TitanRenderer = (props: Props) => JSX.Element;

export default (
  integrationDependencies: IntegrationDependencies,
): TitanRenderer => {
  const { React } = integrationDependencies;

  return (props: Props) => {
    const {
      integration,
      getPresno,
      PresnoRenderer,
      presno: {
        name,
        focused,
        valid,
        child,
        synoId,
      },
    } = props;
    const classes = [
      'syno',
      'same-line',
      'bubble-even',
      'titan',
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
      child && React.createElement(PresnoRenderer, {
        integration,
        getPresno,
        synoId: child.id,
        PresnoRenderer,
      }),
    );
  };
};
