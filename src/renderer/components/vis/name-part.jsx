// @flow
import React from 'react';

type Props = {
  namePart: string,
  focused: boolean,
  charFocused: (number | false)
}

const namePartWithCursor = (namePart, charFocused) => {
  return (
    namePart.slice(0, charFocused) +
    '|' +
    namePart.slice(charFocused, namePart.length)
  )
};

export default (props: Props) => {
  const { namePart, focused, charFocused } = props
  const classes = `code-text same-line ${focused ? 'focused' : 'unfocused'}`;

  return (
    <div className={classes}>
      {
        charFocused === false ?
        namePart :
        namePartWithCursor(namePart, charFocused)
      }
    </div>
  );
};
