import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { DateTime } from 'luxon'
import { Line } from 'react-chartjs-3'
import dornumAll from '../data/dornum-all'

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
  },
}

class YearOnYearChart extends React.Component {
  render() {
    const groupedByDay = dornumAll.data.reduce((obj, { x, y }) => {
      const date = DateTime.fromMillis(x).toISODate()
      if (!(date in obj)) {
        obj[date] = []
      }
      obj[date].push({ x, y })
      return obj
    }, {})

    console.log(groupedByDay)

    const dailyIntermediate = Object.entries(groupedByDay).reduce(
      (obj, [date, values]) => {
        obj[date] = values.reduce(
          ({ open, high, low, close, sum, sumsq, count }, { x, y }) => {
            return {
              open: open === null ? y : open,
              high: high === null || y > high ? y : high,
              low: low == null || y < low ? y : low,
              close: y,
              sum: sum + y,
              sumsq: sumsq + y * y,
              count: count + 1,
            }
          },
          {
            open: null,
            high: null,
            low: null,
            close: null,
            sum: 0,
            sumsq: 0,
            count: 0,
          }
        )
        return obj
      },
      {}
    )

    console.log(dailyIntermediate)

    const dailySummarized = Object.entries(dailyIntermediate).map(
      ([date, { open, high, low, close, sum, sumsq, count }]) => ({
        date: DateTime.fromISO(date, { zone: 'utc' }),
        open,
        high,
        low,
        close,
        mean: count > 0 ? sum / count : null,
        stdev:
          count > 1
            ? Math.sqrt((sumsq - (sum * sum) / count) / (count - 1))
            : null,
      })
    )

    console.log(dailySummarized)

    const series = dailySummarized.reduce((obj, { date, mean }) => {
      const year = date.year.toString()
      if (!(year in obj)) {
        obj[year] = []
      }
      obj[year].push({ x: date.toJSDate(), y: mean })
      return obj
    }, {})

    console.log(series)

    const datasets = Object.entries(series).map(([label, data]) => ({
      label,
      data,
    }))

    const data = { datasets }

    return (
      <div>
        <Typography component="h2" variant="h1" gutterBottom>
          Year on year chart
        </Typography>
        <Typography variant="body2">This is some content</Typography>
        <Line
          data={data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    )
  }
}

YearOnYearChart.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(YearOnYearChart)
