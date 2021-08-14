import type { PresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/present-language-integration';
import type { Presno } from 'saliva-repl/dist/types/presenter/presno';
import type { SynoId } from 'saliva-repl/dist/types/syntactic/syno-id';
import type { SynoRendererProps } from 'saliva-repl/dist/types/renderer/syno-renderer-props';
import type { IntegrationDependencies } from 'saliva-repl/dist/types/language-integration/integration-dependencies';
import type { OlympianPres } from '../types/presentations/olympian';

type Props = {
  integration: PresentLanguageIntegration;
  getPresno: (synoId: SynoId) => Presno;
  // eslint-disable-line react/no-unused-prop-types
  presno: OlympianPres;
  SynoRenderer: (props: SynoRendererProps) => JSX.Element;
};

export default (
  integrationDependencies: IntegrationDependencies,
): (
  (props: Props) => JSX.Element
) => {
  const {
    React,
    components: { NamePart },
  } = integrationDependencies;
  return (props: Props) => {
    const {
      integration,
      getPresno,
      SynoRenderer,
      presno: {
        name,
        focused,
        presnoFocused,
        charFocused,
        valid,
        child,
        synoId,
      },
    } = props;
    const classes = [
      'syno',
      'same-line',
      'bubble-even',
      'olympian',
      focused ? 'focused' : 'unfocused',
      valid ? '' : 'invalid',
    ].join(' ');
    return React.createElement(
      'div',
      {
        className: classes,
        'data-syno-id': synoId,
      },
      name
    && React.createElement(NamePart, {
      namePart: name,
      focused: presnoFocused === 0,
      charFocused,
    }),
      child
    && React.createElement(SynoRenderer, {
      integration,
      getPresno,
      synoId: child.id,
      SynoRenderer,
    }),
    );
  };
};