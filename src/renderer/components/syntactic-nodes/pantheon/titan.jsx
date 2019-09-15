// @flow
import React from 'react';
import SyntacticNode from './../../syntactic-node.jsx'
import NamePart from './../../vis/name-part.jsx'

import type { Grammar } from '../../types/editor-state/grammar'
import type { TitanPres } from '../../../types/presentations/pantheon/titan'
import type { Presno } from '../../../types/presentations/presno'
import type { SynoId } from '../../../types/syno-id'

type Props = {
  grammar: Grammar,
  getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  presno: TitanPres
}

export default (props: Props) => {
  const {
    grammar,
    getPresno,
    presno: {
      syntype,
      name,
      focused,
      presnoFocused,
      charFocused,
      valid,
      child,
      synoId
    }
  } = props;

  const classes = `syno same-line bubble-even titan ${focused ? 'focused' : 'unfocused'} ${valid ? '' : 'invalid'}`;

  return (
    <div className={classes} data-syno-id={synoId}>
      {
        name &&
          <NamePart namePart={name} focused={presnoFocused === 0} charFocused={charFocused} />
      }
      {
        child &&
          <SyntacticNode grammar={grammar} getPresno={getPresno} synoId={child.id} />
      }
    </div>
  );
};
