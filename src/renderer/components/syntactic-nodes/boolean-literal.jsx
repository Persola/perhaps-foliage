// @flow
import React from 'react';
import NamePart from './../vis/name-part.jsx'

import type { BooleanLiteralPres } from '../../../types/presentations/boolean-literal'
import type { Presno } from '../../../types/presentations/presno'
import type { SynoId } from '../../../types/syno-id'

type Props = {
  getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  presno: BooleanLiteralPres
}

export default (props: Props) => {
  const { presno } = props;
  const { presnoFocused, charFocused, valid } = presno;
  if (presno.syntype !== 'booleanLiteral') {
    throw new Error('non-boolean masquerading as boolean');
  }

  const classes = `syno same-line leaf bubble-even boolean-literal ${presno.focused ? 'focused' : 'unfocused'} ${valid ? '' : 'invalid'}`

  return (
    <div className={classes} data-syno-id={presno.synoId}>
      <NamePart namePart={String(presno.value)} focused={false} charFocused={false} />
    </div>
  );
};
