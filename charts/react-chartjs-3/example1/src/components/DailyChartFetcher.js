import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Fetcher from './Fetcher'
import LoadingComponent from './LoadingComponent'
import ErrorComponent from './ErrorComponent'
import DailyChart from './DailyChart'
import { fetchLast24hByNames } from '../data'

const styles = theme => ({})

class DailyChartFetcher extends React.Component {
  render() {
    const { names } = this.props

    return (
      <Fetcher fetcher={() => fetchLast24hByNames(names)}>
        {({ loading, error, data }) => (
          <React.Fragment>
            {loading && <LoadingComponent />}
            {error && <ErrorComponent />}
            {data && <DailyChart data={data} />}
          </React.Fragment>
        )}
      </Fetcher>
    )
  }
}

DailyChartFetcher.propTypes = {
  classes: PropTypes.object.isRequired,
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default withStyles(styles)(DailyChartFetcher)
