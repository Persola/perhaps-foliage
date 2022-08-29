import * as React from 'react';

import type { GapProps } from '../../../../types/renderer/components/gap-props';

export default (props: GapProps): JSX.Element => {
  const { presno: { focused, valid, expectedSyntype } } = props;

  const classes = [
    'same-line',
    'leaf',
    'gap',
    expectedSyntype,
    focused ? 'focused' : 'unfocused',
    valid ? '' : 'invalid',
  ];

  return (
    <div className={classes.join(' ')} />
  );
};
