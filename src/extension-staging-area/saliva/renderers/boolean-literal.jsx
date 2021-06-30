// @flow
import * as React from 'react';
import NamePart from '../../../renderer/components/vis/name-part.jsx';

import type { BooleanLiteralRendererProps } from '../types/renderers/boolean-literal-props';

export default (props: BooleanLiteralRendererProps): React.Node => {
  const { presno } = props;
  const { valid } = presno;
  if (presno.syntype !== 'booleanLiteral') {
    throw new Error('non-boolean masquerading as boolean');
  }

  const classes = [
    'syno',
    'same-line',
    'leaf',
    'bubble-even',
    'boolean-literal',
    (presno.focused ? 'focused' : 'unfocused'),
    (valid ? '' : 'invalid'),
  ].join(' ');

  return (
    <div className={classes} data-syno-id={presno.synoId}>
      <NamePart namePart={String(presno.value)} focused={false} charFocused={false} />
    </div>
  );
};
