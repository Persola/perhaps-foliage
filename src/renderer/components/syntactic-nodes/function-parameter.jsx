// @flow
import React from 'react';

import type { FunctionParameterPres } from '../../../types/presentations/function-parameter'
import type { Presno } from '../../../types/presentations/presno'
import type { SynoId } from '../../../types/syno-id'

type Props = {
  getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  presno: FunctionParameterPres
}

export default (props: Props) => {
  const { presno } = props;
  const classes = `syno same-line leaf expression bubble-even function-parameter ${presno.focused ? 'focused' : 'unfocused'}`;

  return (
    <div className={classes} data-syno-id={presno.synoId}>
      {String(presno.slot)}
    </div>
  );
};
