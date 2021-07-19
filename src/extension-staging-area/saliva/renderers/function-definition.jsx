// @flow
import * as React from 'react';

import type { FunctionDefinitionRendererProps } from '../types/renderers/function-definition-props';

export default (props: FunctionDefinitionRendererProps): React.Node => {
  const { NamePart, integration, getPresno, presno, SynoRenderer } = props;
  const {
    name, presnoFocused, charFocused, valid,
  } = presno;
  const { parameters } = presno;
  const classes = [
    'syno',
    'function-definition',
    (presno.focused ? 'focused' : 'unfocused'),
    (valid ? '' : 'invalid'),
  ].join(' ');

  return (
    <div className={classes} data-syno-id={presno.synoId}>
      <NamePart
        namePart={name}
        focused={presnoFocused === 0}
        charFocused={charFocused}
      />
      {
        parameters.map(paramRef => (
          <SynoRenderer
            integration={integration}
            key={paramRef.id}
            getPresno={getPresno}
            synoId={paramRef.id}
            SynoRenderer={SynoRenderer}
          />
        ))
      }
      {
        presno.body
          && (
            <SynoRenderer
              integration={integration}
              getPresno={getPresno}
              synoId={presno.body.id}
              SynoRenderer={SynoRenderer}
            />
          )
      }
    </div>
  );
};
