import * as React from 'react';

import type { BudProps } from '../../../../types/renderer/components/bud-props';

export default (props: BudProps): JSX.Element => {
  const classes = [
    'same-line',
    'leaf',
    'bud',
    'syno',
  ];

  return (
    <div className={classes.join(' ')} />
  );
};
