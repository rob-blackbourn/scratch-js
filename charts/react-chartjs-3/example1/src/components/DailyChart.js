import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Line } from 'react-chartjs-3'
import 'chartjs-plugin-colorschemes'

const styles = theme => ({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  line: {},
})

function dataToSeries(data) {
  const series = data.reduce((obj, { name, date, value }) => {
    if (obj[name] === undefined) {
      obj[name] = []
    }
    obj[name].push({ x: date, y: value })
    return obj
  }, {})
  return series
}

class DailyChart extends React.Component {
  render() {
    const { data, classes } = this.props

    if (data === undefined || data.length === 0) {
      return (
        <div>
          <Typography variant="h2">No Data</Typography>
        </div>
      )
    }

    const series = dataToSeries(data)

    const datasets = Object.entries(series).map(([label, data]) => ({
      label,
      data,
      fill: false,
      pointRadius: 0,
      xAxisID: 'x-axis',
      yAxisID: 'y-axis',
    }))

    const chartData = { datasets }

    return (
      <div className={classes.root}>
        <Line
          className={classes.line}
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              colorschemes: {
                scheme: 'brewer.PuBu3',
              },
            },
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

DailyChart.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DailyChart)
