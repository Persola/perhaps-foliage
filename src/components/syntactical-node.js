import React from 'react'

export class SyntacticalNode extends React.Component {
  render() {
  	const { serialization } = this.props  
  	if(serialization.klass !== 'numberLiteral') { throw 'No types yet' }

    return(
      <div>
        {serialization.data}
      </div>
    )
  }
}
