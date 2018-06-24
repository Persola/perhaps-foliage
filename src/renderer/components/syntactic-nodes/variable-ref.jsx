// @flow
import React from 'react';
import type { VariableRefPres } from '../../../types/presentations/variable-ref'
import type { Presno } from '../../../types/presentations/presno'
import type { SynoId } from '../../../types/syno-id'

type Props = {
  getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  presno: VariableRefPres
}

export default (props: Props) => {
  const { presno } = props;
  const classes = `syno same-line leaf bubble-even argument variable-ref ${presno.focused ? 'focused' : 'unfocused'}`

  return (
    <div className={classes} data-syno-id={presno.synoId}>
      {presno.name}
    </div>
  );
};
