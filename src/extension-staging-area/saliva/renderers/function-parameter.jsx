// @flow
import * as React from 'react';
import NamePart from '../../../renderer/components/vis/name-part.jsx';

import type { FunctionParameterRendererProps } from '../types/renderers/function-parameter-props';

export default (props: FunctionParameterRendererProps): React.Node => {
  const { presno } = props;
  const { presnoFocused, charFocused } = presno;
  const classes = [
    'syno',
    'same-line',
    'leaf',
    'bubble-even',
    'function-parameter',
    (presno.focused ? 'focused' : 'unfocused'),
  ].join(' ');

  return (
    <div className={classes} data-syno-id={presno.synoId}>
      <NamePart namePart={presno.slot} focused={presnoFocused === 0} charFocused={charFocused} />
    </div>
  );
};
