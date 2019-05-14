import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import dornumAll from '../data/dornum-all'

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
  },
}

class YearOnYearChart extends React.Component {
  render() {
    const data2 = dornumAll.data.map(({ x, y }) => ({ x: new Date(x), y }))
    console.log(data2)

    return (
      <div>
        <Typography component="h2" variant="h1" gutterBottom>
          Year on year chart
        </Typography>
        <Typography variant="body2">This is some content</Typography>
      </div>
    )
  }
}

YearOnYearChart.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(YearOnYearChart)
