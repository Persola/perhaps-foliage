// @flow
import React from 'react';
import SyntacticNode from '../../../renderer/components/syntactic-node.jsx'
import NamePart from '../../../renderer/components/vis/name-part.jsx'

import type { GrammarName } from '../../../types/editor-state/grammar-name'
import type { Presno } from '../../../types/presenter/presno'
import type { SynoId } from '../../../types/syno-id'
import type { TitanPres } from '../types/presentations/titan'

type Props = {
  grammarName: GrammarName,
  getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  presno: TitanPres
}

export default (props: Props) => {
  const {
    grammarName,
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
          <SyntacticNode grammarName={grammarName} getPresno={getPresno} synoId={child.id} />
      }
    </div>
  );
};
