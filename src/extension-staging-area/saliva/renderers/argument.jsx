// @flow
import React from 'react';
import SyntacticNode from '../../../renderer/components/syntactic-node.jsx'
import NamePart from '../../../renderer/components/vis/name-part.jsx'

import type { GrammarName } from '../../../types/editor-state/grammar-name'
import type { Presno } from '../../../types/presenter/presno'
import type { SynoId } from '../../../types/syno-id'
import type { ArgumentPres } from '../types/presentations/argument'

type Props = {
  grammar: GrammarName,
  getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  presno: ArgumentPres
}

export default (props: Props) => {
  const {
    grammar,
    getPresno,
    presno: {
      focused,
      synoId,
      name,
      value,
      presnoFocused,
      charFocused,
      valid
    }
  } = props;

  const classes = `syno same-line bubble-even argument ${focused ? 'focused' : 'unfocused'} ${valid ? '' : 'invalid'}`;

  return (
    <div className={classes} data-syno-id={synoId}>
      {
        name &&
          <NamePart namePart={name} focused={presnoFocused === 0} charFocused={charFocused} />
      }
      {
        value &&
          <SyntacticNode grammar={grammar} getPresno={getPresno} synoId={value.id} />
      }
    </div>
  );
};
