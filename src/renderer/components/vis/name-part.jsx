// @flow
import React from 'react';

type Props = {
  namePart: string,
  focused: boolean
}

export default (props: Props) => {
  const { namePart, focused } = props
  const classes = `code-text same-line ${focused ? 'focused' : 'unfocused'}`;

  return (
    <div className={classes}>
      {String(namePart)}
    </div>
  );
};
