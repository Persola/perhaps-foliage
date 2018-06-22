// @flow
import React from 'react';
import type { SynoId } from '../../../types/syno-id'

type Props = {
  namePart: SynoId
}

export default (props: Props) => {
  const { namePart } = props

  return (
    <div className="same-line leaf bubble-plus">
      {String(namePart)}
    </div>
  );
};
