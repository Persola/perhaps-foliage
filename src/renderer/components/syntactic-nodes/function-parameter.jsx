// @flow
import React from 'react';
import NamePart from './../vis/name-part.jsx'

import type { Grammar } from '../../types/editor-state/grammar'
import type { FunctionParameterPres } from '../../../types/presentations/function-parameter'
import type { Presno } from '../../../types/presentations/presno'
import type { SynoId } from '../../../types/syno-id'

type Props = {
  grammar: Grammar,
  getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  presno: FunctionParameterPres
}

export default (props: Props) => {
  const { grammar, presno } = props;
  const { presnoFocused, charFocused } = presno;
  const classes = `syno same-line leaf bubble-even function-parameter ${presno.focused ? 'focused' : 'unfocused'}`;

  return (
    <div className={classes} data-syno-id={presno.synoId}>
      <NamePart namePart={presno.slot} focused={presnoFocused === 0} charFocused={charFocused} />
    </div>
  );
};
