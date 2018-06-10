// @flow
import React from 'react';
import type { nodeId } from '../../../types/node-id'

type Props = {
  namePart: nodeId
}

export default (props: Props) => {
  const { namePart } = props

  return (
    <div className="same-line leaf bubble-plus">
      {String(namePart)}
    </div>
  );
};
