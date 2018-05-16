import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    numerator: {
        margin: -2,
        fontSize: "60%",
        verticalAlign: "35%"
    },
    denominator: {
        fontSize: "60%",
        margin: -2,
    },
    slash: {
        fontSize: "85%",
        verticalAlign: "13%"
    }
});

const Fraction = ({classes, numerator, denominator}) => (
    <Fragment>
        <span className={classes.numerator}>{numerator}</span>
        <span className={classes.slash}>&frasl;</span>
        <span className={classes.denominator}>{denominator}</span>
    </Fragment>
)

Fraction.propTypes = {
    numerator: PropTypes.number.isRequired,
    denominator: PropTypes.number.isRequired
}

export default withStyles(styles)(Fraction)