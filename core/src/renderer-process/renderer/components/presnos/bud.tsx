import * as React from 'react';

import type { BudProps } from '../../../../types/renderer/components/bud-props';

export default (props: BudProps): JSX.Element => {
  const classes = 'same-line bud';

  return (
    <div className={classes} />
  );
};
