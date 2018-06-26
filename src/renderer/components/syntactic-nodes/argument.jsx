// @flow
import React from 'react';
import SyntacticNode from './../syntactic-node.jsx'
import NamePart from './../vis/name-part.jsx'

import type { ArgumentPres } from '../../../types/presentations/argument'
import type { Presno } from '../../../types/presentations/presno'
import type { SynoId } from '../../../types/syno-id'

type Props = {
  getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  presno: ArgumentPres
}

export default (props: Props) => {
  const { getPresno, presno } = props;
  const classes = `syno same-line bubble-even argument ${presno.focused ? 'focused' : 'unfocused'}`;

  return (
    <div className={classes} data-syno-id={presno.synoId}>
      <NamePart namePart={presno.name} />
      <SyntacticNode getPresno={getPresno} presnoId={presno.value.id} />
    </div>
  );
};
