// @flow
import React from 'react';
import type { synoId } from '../../../types/syno-id'

type Props = {
  namePart: synoId
}

export default (props: Props) => {
  const { namePart } = props

  return (
    <div className="same-line leaf bubble-plus">
      {String(namePart)}
    </div>
  );
};
