import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import UnitCompleterLinkFactory from './UnitCompleterLink'
import ValueDisplayLinkFactory from './ValueDisplayLink'

const SourceUnitSelector = UnitCompleterLinkFactory(true)
const DestinationUnitSelector = UnitCompleterLinkFactory(false)
const SourceValueDisplay = ValueDisplayLinkFactory(true)
const DestinationValueDisplay = ValueDisplayLinkFactory(false)

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
    <Paper  className={classes.paper}>
        <SourceUnitSelector usage="Cookery" />
        <br />
        <SourceValueDisplay />
        <br />
        <DestinationUnitSelector usage="Cookery" />
        <br />
        <DestinationValueDisplay />
    </Paper>
)

export default connect()(withStyles(styles)(Converter))