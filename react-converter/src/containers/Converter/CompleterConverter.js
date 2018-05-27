import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
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
        padding: theme.spacing.unit * 2,
        textAlign: 'left'
    },
  });

const Converter = ({ classes }) => (
    <Paper  className={classes.root}>
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