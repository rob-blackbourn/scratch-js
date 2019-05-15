import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
  },
})

class LoadingComponent extends React.Component {
  render() {
    return (
      <div>
        <Typography variant="h1">Loading</Typography>
      </div>
    )
  }
}
LoadingComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoadingComponent)
