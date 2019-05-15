import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import FlowCheckboxSelector from './FlowCheckboxSelector'
import DailyChartFetcher from './DailyChartFetcher'

const styles = theme => ({
  root: {
    // width: '100%',
    // height: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
})

class FlowsControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = { names: [] }
  }

  handleNamesSelectionChanged = names => {
    this.setState({ names })
  }

  render() {
    const { names } = this.state
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Flows</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FlowCheckboxSelector onChange={this.handleNamesSelectionChanged} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <DailyChartFetcher names={names} />
      </div>
    )
  }
}
FlowsControl.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FlowsControl)
