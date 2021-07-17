// @flow
import * as React from 'react';
import NamePart from '../../../renderer/components/vis/name-part.jsx';

import type { LanguageIntegration } from '../../../types/language-integration';
import type { Presno } from '../../../types/presenter/presno';
import type { SynoId } from '../../../types/syno-id';
import type { SynoRendererProps } from '../../../types/syno-renderer-props';
import type { TitanPres } from '../types/presentations/titan';

type Props = {
  integration: LanguageIntegration,
  getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  presno: TitanPres,
  SynoRenderer: (props: SynoRendererProps) => React.Node
}

export default (props: Props): React.Node => {
  const {
    integration,
    getPresno,
    SynoRenderer,
    presno: {
      name,
      focused,
      presnoFocused,
      charFocused,
      valid,
      child,
      synoId,
    },
  } = props;

  const classes = [
    'syno',
    'same-line',
    'bubble-even',
    'titan',
    (focused ? 'focused' : 'unfocused'),
    (valid ? '' : 'invalid'),
  ].join(' ');

  return (
    <div className={classes} data-syno-id={synoId}>
      {
        name
          && <NamePart namePart={name} focused={presnoFocused === 0} charFocused={charFocused} />
      }
      {
        child
          && (
            <SynoRenderer
              integration={integration}
              getPresno={getPresno}
              synoId={child.id}
              SynoRenderer={SynoRenderer}
            />
          )
      }
    </div>
  );
};
