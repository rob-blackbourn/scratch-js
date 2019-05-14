import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { DateTime } from 'luxon'
import { Line } from 'react-chartjs-3'
import 'chartjs-plugin-colorschemes'
import { rtbLargestTriangleThreeBuckets } from './downsample'
import dornumAll from '../data/dornum-all'

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
  },
}

function summarizeDataDaily(data, getDate, getValue) {
  const groupedByDay = data.reduce((obj, item) => {
    const date = getDate(item)
    const value = getValue(item)

    const dateKey = DateTime.fromMillis(date).toISODate()
    if (!(dateKey in obj)) {
      obj[dateKey] = []
    }
    obj[dateKey].push({ date, value })
    return obj
  }, {})

  const dailyIntermediate = Object.entries(groupedByDay).reduce(
    (obj, [dateKey, values]) => {
      obj[dateKey] = values.reduce(
        ({ open, high, low, close, sum, sumsq, count }, { date, value }) => {
          return {
            open: open === null ? value : open,
            high: high === null || value > high ? value : high,
            low: low == null || value < low ? value : low,
            close: value,
            sum: sum + value,
            sumsq: sumsq + value * value,
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
  return dailySummarized
}

function groupByYear(data, getDate, getValue) {
  return data.reduce((obj, item) => {
    const date = getDate(item)
    const value = getValue(item)
    const year = date.year.toString()
    if (!(year in obj)) {
      obj[year] = []
    }
    obj[year].push({
      x: DateTime.utc(2000, date.month, date.day).toJSDate(),
      y: value,
    })
    return obj
  }, {})
}

class YearOnYearChart extends React.Component {
  render() {
    const dailySummarized = summarizeDataDaily(
      dornumAll.data,
      item => item.x,
      item => item.y
    )

    console.log(dailySummarized)

    const series = groupByYear(
      dailySummarized,
      item => item.date,
      item => item.mean
    )

    console.log(series)

    // const datasets = Object.entries(series).map(([label, data]) => ({
    //   label,
    //   data,
    //   fill: false,
    //   pointRadius: 0,
    //   xAxisID: 'x-axis',
    //   yAxisID: 'y-axis',
    // }))

    const datasets = Object.entries(series).map(([label, data]) => ({
      label,
      data: rtbLargestTriangleThreeBuckets(
        data,
        item => item.x.valueOf(),
        item => item.y,
        100
      ),
      fill: false,
      pointRadius: 0,
      xAxisID: 'x-axis',
      yAxisID: 'y-axis',
    }))

    const data = { datasets }

    console.log(data)

    return (
      <div>
        <Typography component="h2" variant="h1" gutterBottom>
          Year on year chart
        </Typography>
        <Typography variant="body2">This is some content</Typography>
        <Line
          data={data}
          options={{
            responsive: true,
            plugins: {
              colorschemes: {
                scheme: 'brewer.PuBu3',
              },
            },
            maintainAspectRatio: false,
            legend: {
              labels: {
                fontColor: '#ccc',
                usePointStyle: true,
              },
            },
            scales: {
              xAxes: [
                {
                  id: 'x-axis',
                  gridLines: {
                    color: 'rgba(255, 255, 255, 0.2)',
                    zeroLineColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  ticks: {
                    fontStyle: 'bold',
                    major: {
                      fontColor: '#ccc',
                    },
                  },
                  type: 'time',
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Date',
                  },
                },
              ],
              yAxes: [
                {
                  id: 'y-axis',
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'value',
                  },
                  gridLines: {
                    color: 'rgba(255, 255, 255, 0.2)',
                    zeroLineColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  ticks: {
                    fontColor: '#ccc',
                  },
                },
              ],
            },
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
