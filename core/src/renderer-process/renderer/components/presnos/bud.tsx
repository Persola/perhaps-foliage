import * as React from 'react';

import type { BudProps } from '../../../../types/renderer/components/bud-props';

export default (props: BudProps): JSX.Element => {
  const { presno: { focused, valid, expectedSyntype } } = props;

  const classes = [
    'same-line',
    'leaf',
    'bud',
    'syno',
    expectedSyntype,
    focused ? 'focused' : 'unfocused',
    valid ? '' : 'invalid',
  ];

  return (
    <div className={classes.join(' ')} />
  );
};
