// @flow
import React from 'react';

type Props = {
  serialization: {
    klass: string,
    data: Object,
  }
}

export default (props: Props) => {
  const { serialization } = props;
  if (serialization.klass !== 'numberLiteral') { throw new Error('no types yet'); }

  const contextualType = 'expression';
  const contentualType = 'number-literal';

  return (
    <div className={`leaf ${contextualType} ${contentualType}`}>
      {serialization.data}
    </div>
  );
};
