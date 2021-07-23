// @flow
import * as React from 'react';

import type { NamePartProps } from '../../../types/renderer/name-part-props';

const namePartWithCursor = (namePart, charFocused) => (
  `${namePart.slice(0, charFocused)
  }|${
    namePart.slice(charFocused, namePart.length)}`
);

export default (props: NamePartProps): React.Node => {
  const { namePart, focused, charFocused } = props;
  const classes = `code-text same-line ${focused ? 'focused' : 'unfocused'}`;

  return (
    <div className={classes}>
      {
        (charFocused === null)
          ? namePart
          : namePartWithCursor(namePart, charFocused)
      }
    </div>
  );
};
