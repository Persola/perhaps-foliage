// @flow
import React from 'react';

type Props = {
  namePart: string
}

export default (props: Props) => {
  const { namePart } = props

  return (
    <div className="same-line leaf bubble-plus">
      {namePart}
    </div>
  );
};
