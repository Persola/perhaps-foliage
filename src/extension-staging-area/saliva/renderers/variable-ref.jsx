// @flow
import * as React from 'react';
import NamePart from '../../../renderer/components/vis/name-part.jsx';

import type { VariableRefRendererProps } from '../types/renderers/variable-ref-props';

export default (props: VariableRefRendererProps) => {
  const { presno, SynoRenderer } = props;
  const { presnoFocused, charFocused } = presno;
  const classes = [
    'syno',
    'same-line',
    'leaf',
    'bubble-even',
    'variable-ref',
    (presno.focused ? 'focused' : 'unfocused'),
  ].join(' ');

  return (
    <div className={classes} data-syno-id={presno.synoId}>
      {
        presno.name
          && (
            <NamePart
              namePart={presno.name}
              focused={presnoFocused === 0}
              charFocused={charFocused}
              SynoRenderer={SynoRenderer}
            />
          )
      }
    </div>
  );
};
