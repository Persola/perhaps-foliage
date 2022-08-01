import * as React from 'react';

import type { TextProps } from '../../../../types/renderer/components/text-props';

export default (props: TextProps): JSX.Element => {
  const classes = 'code-text same-line';
  const { text } = props;

  return (
    <div className={classes}>
      { text }
    </div>
  );
};
