import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FlowCheckboxSelector from './FlowCheckboxSelector'
import data from '../data'

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
  },
}

class FlowsControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = { names: [] }
  }

  render() {
    return (
      <div>
        <FlowCheckboxSelector
          names={Object.getOwnPropertyNames(data)}
          onChanged={selectedNames => this.setState({ selectedNames })}
        />
      </div>
    )
  }
}
FlowsControl.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FlowsControl)
