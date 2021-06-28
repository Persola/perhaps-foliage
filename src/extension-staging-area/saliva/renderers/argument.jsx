// @flow
import * as React from 'react';
import NamePart from '../../../renderer/components/vis/name-part.jsx';

import type { ArgumentRendererProps } from '../types/renderers/argument-props';

export default (props: ArgumentRendererProps) => {
  const {
    grammarName,
    getPresno,
    SynoRenderer,
    presno: {
      focused,
      synoId,
      name,
      value,
      presnoFocused,
      charFocused,
      valid,
    },
  } = props;

  const classes = [
    'syno',
    'same-line',
    'bubble-even',
    'argument',
    (focused ? 'focused' : 'unfocused'),
    (valid ? '' : 'invalid'),
  ].join(' ');

  return (
    <div className={classes} data-syno-id={synoId}>
      {
        name
          && <NamePart namePart={name} focused={presnoFocused === 0} charFocused={charFocused} />
      }
      {
        value
          && (
            <SynoRenderer
              grammarName={grammarName}
              getPresno={getPresno}
              synoId={value.id}
              SynoRenderer={SynoRenderer}
            />
          )
      }
    </div>
  );
};
