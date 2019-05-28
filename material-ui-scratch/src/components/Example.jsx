import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({})

class Example extends React.Component {
  render () {
    return <Typography variant='h1'>Example</Typography>
  }
}
Example.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Example)
