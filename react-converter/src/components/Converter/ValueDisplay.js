import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

import DisplayMethod from './DisplayMethod'

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    displaySettings: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,        
    },
    button: {
        margin: theme.spacing.unit,
    }
})

const ValueDisplay = ({classes, value, onValueChanged, style, onStyleChanged, isSettingsOpen, toggleSettings}) => {
    return (
        <Fragment>

            <TextField
                label="Value"
                className={classes.textField}
                value={value || ''}
                onChange={(e) => onValueChanged(e.target.value)}
                margin="normal" />

            <IconButton
                aria-label="settings"
                className={classes.button}
                onClick={() => toggleSettings()}>
                {isSettingsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>

            {isSettingsOpen ? (
                <Fragment>
                    <br />

                    <DisplayMethod 
                        className={classes.displaySettings}
                        isDecimal={style.isDecimal} 
                        decimalPrecision={style.decimalPrecision}
                        isFractionRounded={style.isFractionRounded} 
                        fractionDenominators={style.fractionDenominators}
                        isFractionRationalised={style.isFractionRationalised}
                        rationalisePrecision={style.rationalisePrecision}
                        fromFloatPrecision={style.fromFloatPrecision}
                        onStyleChanged={onStyleChanged} />
                </Fragment>
            ) : null}

        </Fragment>
    )
}

ValueDisplay.propTypes = {
    value: PropTypes.string,
    onValueChanged: PropTypes.func.isRequired,
    onValueChanged: PropTypes.func.isRequired,
    style: PropTypes.shape({
        isDecimal: PropTypes.bool.isRequired,
        decimalPrecision: PropTypes.number.isRequired,
        isFractionRounded: PropTypes.bool.isRequired,
        fractionDenominators: PropTypes.arrayOf(PropTypes.number).isRequired,
        isFractionRationalised: PropTypes.bool.isRequired,
        rationalisePrecision: PropTypes.number.isRequired,
        fromFloatPrecision: PropTypes.number.isRequired
    }).isRequired,
    isSettingsOpen: PropTypes.bool.isRequired,
    toggleSettings: PropTypes.func.isRequired,
    onStyleChanged: PropTypes.func.isRequired
}

export default withStyles(styles)(ValueDisplay)