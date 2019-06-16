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
  const { getPresno, presno: { focused, synoId, name, value, presnoFocused, charFocused } } = props;
  const classes = `syno same-line bubble-even argument ${focused ? 'focused' : 'unfocused'}`;

  return (
    <div className={classes} data-syno-id={synoId}>
      <NamePart namePart={name} focused={presnoFocused === 0} charFocused={charFocused} />
      <SyntacticNode getPresno={getPresno} synoId={value.id} />
    </div>
  );
};
