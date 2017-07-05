import React from 'react'
import { connect } from 'react-redux'

import { SyntacticalNode } from 'projectRoot/components/syntactical-node.js'

export class CodeStage extends React.Component {
  render() {
    const { code } = this.props

    return(
      <SyntacticalNode
        serialization={code}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    code: state.code
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch()
    }
  }
}

const CodeStageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeStage)

export default CodeStageContainer
