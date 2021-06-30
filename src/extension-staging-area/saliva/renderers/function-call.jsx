// @flow
import * as React from 'react';
import NamePart from '../../../renderer/components/vis/name-part.jsx';

import type { FunctionCallRendererProps } from '../types/renderers/function-call-props';
import type { SynoId } from '../../../types/syno-id';
import type { GrammarName } from '../../../types/editor-state/grammar-name';
import type { Presno } from '../../../types/presenter/presno';
import type { PresnoRef } from '../../../types/presenter/presno-ref';
import type { SynoRendererProps } from '../../../types/syno-renderer-props';

const argumentEls = (
  grammarName: GrammarName,
  getPresno: (SynoId) => Presno,
  argumentz: PresnoRef[],
  SynoRenderer: (props: SynoRendererProps) => React.Node,
) => (
  argumentz.map((argRef: PresnoRef, ind) => (
    <SynoRenderer
      grammarName={grammarName}
      key={`arg_${ind + 1}`}
      getPresno={getPresno}
      synoId={argRef.id}
      SynoRenderer={SynoRenderer}
    />
  ))
);

export default (props: FunctionCallRendererProps): React.Node => {
  const { grammarName, getPresno, presno, SynoRenderer } = props;
  const { presnoFocused, charFocused } = presno;
  const {
    name, callee, resolved, focused, valid,
  } = presno;

  const argumentz = argumentEls(grammarName, getPresno, presno.argumentz, SynoRenderer);
  const classes = [
    'syno',
    (resolved ? 'function-call' : 'unresolved'),
    (focused ? 'focused' : 'unfocused'),
    (valid ? '' : 'invalid'),
  ].join(' ');

  return (
    <div className={classes} data-syno-id={presno.synoId}>
      {
        name
          && <NamePart namePart={name} focused={presnoFocused === 0} charFocused={charFocused} />
      }
      { argumentz }
      {
        callee
          && (
            <SynoRenderer
              grammarName={grammarName}
              getPresno={getPresno}
              synoId={callee.id}
              SynoRenderer={SynoRenderer}
            />
          )
      }
    </div>
  );
};
