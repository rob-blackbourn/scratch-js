import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import UnitCompleterLinkFactory from './UnitCompleterLink'

const SourceUnitSelector = UnitCompleterLinkFactory(true)
const DestinationUnitSelector = UnitCompleterLinkFactory(false)

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
                <SourceUnitSelector usage="Cookery" />
            </Paper>
        </Grid>
        <Grid item sm>
            <Paper  className={classes.paper}>
                <DestinationUnitSelector usage="Cookery" />
            </Paper>
        </Grid>
    </Grid>
)

export default connect()(withStyles(styles)(Converter))