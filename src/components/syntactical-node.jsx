// @flow
import React from 'react';

export default () => {
  const { serialization } = this.props;
  if (serialization.klass !== 'numberLiteral') { throw new Error('no types yet'); }

  const contextualType = 'expression';
  const contentualType = 'number-literal';

  const htmlClassString = `leaf ${contextualType} ${contentualType}`;

  return (
    <div className={htmlClassString}>
      {serialization.data}
    </div>
  );
};
