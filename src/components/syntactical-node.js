// @flow
import React from 'react'

export class SyntacticalNode extends React.Component {
  render() {
  	const { serialization } = this.props
  	if(serialization.klass !== 'numberLiteral') { throw 'No types yet' }

  	const contextualType = 'expression'
    const contentualType = 'number-literal'

    return(
      <div className="leaf ${contextualType} ${contentualType}">
        {serialization.data}
      </div>
    )
  }
}
