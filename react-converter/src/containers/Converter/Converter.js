import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import UnitSelectorLinkFactory from './UnitSelectorLink'

const SourceUnitSelector = UnitSelectorLinkFactory(true)
const DestinationUnitSelector = UnitSelectorLinkFactory(false)

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left'
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
  });

const Converter = ({ classes }) => (
    <Grid container className={classes.root}>
        <Grid item sm>
            <Paper  className={classes.paper}>
                <SourceUnitSelector />
                <DestinationUnitSelector />
            </Paper>
        </Grid>
        <Grid item sm>
            <Paper  className={classes.paper}>
            </Paper>
        </Grid>
    </Grid>
)

export default connect()(withStyles(styles)(Converter))