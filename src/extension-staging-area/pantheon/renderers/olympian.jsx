// @flow
import * as React from 'react';
import NamePart from '../../../renderer/components/vis/name-part.jsx';

import type { PresentLanguageIntegration } from '../../../types/language-integration/present-language-integration';
import type { Presno } from '../../../types/presenter/presno';
import type { SynoId } from '../../../types/syno-id';
import type { SynoRendererProps } from '../../../types/renderer/syno-renderer-props';
import type { OlympianPres } from '../types/presentations/olympian';

type Props = {
  integration: PresentLanguageIntegration,
  getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  presno: OlympianPres,
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
    'olympian',
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
