import type { ReactType } from "../../../types/react";
import type { FunctionCallRendererProps } from "../types/renderers/function-call-props";
import type { SynoId } from "../../../types/syno-id";
import type { PresentLanguageIntegration } from "../../../types/language-integration/present-language-integration";
import type { Presno } from "../../../types/presenter/presno";
import type { PresnoRef } from "../../../types/presenter/presno-ref";
import type { IntegrationDependencies } from "../../../types/language-integration/integration-dependencies";

const argumentEls = (React: ReactType, integration: PresentLanguageIntegration, getPresno: (arg0: SynoId) => Presno, argumentz: PresnoRef[], SynoRenderer) => argumentz.map((argRef: PresnoRef, ind) => {
  return React.createElement(SynoRenderer, {
    integration,
    key: `arg_${ind + 1}`,
    getPresno,
    synoId: argRef.id,
    SynoRenderer
  });
});

export default ((integrationDependencies: IntegrationDependencies) => {
  const {
    React,
    components: {
      NamePart
    }
  } = integrationDependencies;
  return (props: FunctionCallRendererProps) => {
    const {
      integration,
      getPresno,
      presno,
      SynoRenderer
    } = props;
    const {
      presnoFocused,
      charFocused
    } = presno;
    const {
      name,
      callee,
      resolved,
      focused,
      valid
    } = presno;
    const argumentz = argumentEls(React, integration, getPresno, presno.argumentz, SynoRenderer);
    const classes = ['syno', resolved ? 'function-call' : 'unresolved', focused ? 'focused' : 'unfocused', valid ? '' : 'invalid'].join(' ');
    return React.createElement('div', {
      className: classes,
      'data-syno-id': presno.synoId
    }, name && React.createElement(NamePart, {
      namePart: name,
      focused: presnoFocused === 0,
      charFocused
    }), argumentz, callee && React.createElement(SynoRenderer, {
      integration,
      getPresno,
      synoId: callee.id,
      SynoRenderer
    }));
  };
});