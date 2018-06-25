// @flow
import React from 'react';

type Props = {
  namePart: string
}

export default (props: Props) => {
  const { namePart } = props

  return (
    <div className="code-text same-line">
      {String(namePart)}
    </div>
  );
};
