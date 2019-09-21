// @flow
import React from 'react';
import SyntacticNode from '../../../renderer/components/syntactic-node.jsx'
import NamePart from '../../../renderer/components/vis/name-part.jsx'

import type { GrammarName } from '../../../types/editor-state/grammar-name'
import type { Presno } from '../../../types/presenter/presno'
import type { SynoId } from '../../../types/syno-id'
import type { OlympianPres } from '../types/presentations/olympian'

type Props = {
  grammar: GrammarName,
  getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  presno: OlympianPres
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

  const classes = `syno same-line bubble-even olympian ${focused ? 'focused' : 'unfocused'} ${valid ? '' : 'invalid'}`;

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
