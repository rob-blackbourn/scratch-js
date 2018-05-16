import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import FormLabel from '@material-ui/core/FormLabel'
import Switch from 'material-ui/Switch'
import Checkbox from 'material-ui/Checkbox'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'

import Fraction from './Fraction'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
    formGroup: {
        margin: theme.spacing.unit,
        width: 200
    },
    formCheckboxControl: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    expansionPanel: {
    }
});


const DisplayMethod = ({ 
    classes,
    isDecimal,
    decimalPrecision,
    isFractionRounded,
    fractionDenominators,
    isFractionRationalised,
    rationalisePrecision,
    fromFloatPrecision,
    onStyleChanged
}) => {

    const onIsDecimalChanged = (event, checked) => {
        isDecimal = checked
        onStyleChanged(isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision)
    }
    
    const onDecimalPrecisionChanged = (event) => {
        decimalPrecision = Math.trunc(Number.parseFloat(event.target.value))
        onStyleChanged(isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision)
    }

    const onIsFractionRoundedChanged = (event, checked) => {
        isFractionRounded = checked
        onStyleChanged(isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision)
    }

    const onFractionDemonitorsChanged = (event, checked) => {
        const denominator = Math.trunc(Number.parseFloat(event.target.value))
        if (Number.isNaN(denominator)) {
            return
        }
        fractionDenominators = checked
            ? [...fractionDenominators, denominator].sort()
            : fractionDenominators.filter(x => x !== denominator)
            onStyleChanged(isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision)
        }

    const onIsFractionRationalisedChanged = (event, checked) => {
        isFractionRationalised = checked
        onStyleChanged(isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision)
    }
    
    const onRationalisePrecisionChanged = (event) => {
        rationalisePrecision = Math.trunc(Number.parseFloat(event.target.value))
        onStyleChanged(isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision)
    }
    
    const onFromFloatPrecisionChanged = (event) => {
        fromFloatPrecision = Math.trunc(Number.parseFloat(event.target.value))
        onStyleChanged(isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision)
    }

    return (
        <Fragment>
            <FormControlLabel
                className={classes.formControl}
                label='Show as a decimal'
                control={
                    <Switch 
                        checked={isDecimal}
                        onChange={onIsDecimalChanged}
                    />
                }
            />

            <br />

            <TextField
                label="Decimal precision" 
                value={decimalPrecision}
                disabled={!isDecimal}
                type="number"
                className={classes.textField}
                onChange={onDecimalPrecisionChanged} />

            <br />

            <FormControlLabel
                className={classes.formControl}
                label='Is Rounded'
                disabled={isDecimal}
                control={
                    <Switch 
                        checked={isFractionRounded}
                        onChange={onIsFractionRoundedChanged}
                    />
                }
            />

            <br />

            <FormControl component="fieldset" className={classes.FormControl}>
                <FormLabel component="legend">Fraction rounding</FormLabel>
                <FormGroup row className={classes.formControl}>
                    <FormControlLabel
                        className={classes.formCheckboxControl}
                        label={<Fraction numerator={1} denominator={2} />}
                        control={
                            <Checkbox
                                checked={fractionDenominators.includes(2)}
                                value="2"
                                onChange={onFractionDemonitorsChanged} />
                        } />
                    <FormControlLabel
                        className={classes.formCheckboxControl}
                        label={<Fraction numerator={1} denominator={3} />}
                        control={
                            <Checkbox
                                checked={fractionDenominators.includes(3)}
                                value="3"
                                onChange={onFractionDemonitorsChanged} />
                        } />
                    <FormControlLabel
                        className={classes.formCheckboxControl}
                        label={<Fraction numerator={1} denominator={4} />}
                        control={
                            <Checkbox
                                checked={fractionDenominators.includes(4)}
                                value="4"
                                onChange={onFractionDemonitorsChanged} />
                        } />
                    <FormControlLabel
                        className={classes.formCheckboxControl}
                        label={<Fraction numerator={1} denominator={6} />}
                        control={
                            <Checkbox
                                checked={fractionDenominators.includes(6)}
                                value="6"
                                onChange={onFractionDemonitorsChanged} />
                        } />
                    <FormControlLabel
                        className={classes.formCheckboxControl}
                        label={<Fraction numerator={1} denominator={8} />}
                        control={
                            <Checkbox
                                checked={fractionDenominators.includes(8)}
                                value="8"
                                onChange={onFractionDemonitorsChanged} />
                        } />
                    <FormControlLabel
                        className={classes.formCheckboxControl}
                        label={<Fraction numerator={1} denominator={12} />}
                        control={
                            <Checkbox
                                checked={fractionDenominators.includes(12)}
                                value="12"
                                onChange={onFractionDemonitorsChanged} />
                        } />
                    <FormControlLabel
                        className={classes.formCheckboxControl}
                        label={<Fraction numerator={1} denominator={16} />}
                        control={
                            <Checkbox
                                checked={fractionDenominators.includes(16)}
                                value="16"
                                onChange={onFractionDemonitorsChanged} />
                        } />
                </FormGroup>

            </FormControl>

            <br />

            <Tooltip title="The precision used when converting from a decimal to a fraction">
                <TextField
                    label="From decimal precision" 
                    value={fromFloatPrecision}
                    disabled={isDecimal}
                    type="number"
                    className={classes.textField}
                    onChange={onFromFloatPrecisionChanged} />
            </Tooltip>

            <br />

            <FormControlLabel
                className={classes.formControl}
                label='Rationalise fraction'
                control={
                    <Switch 
                        disabled={isDecimal}
                        checked={isFractionRationalised}
                        onChange={onIsFractionRationalisedChanged}
                    />
                }
            />

            <br />

            <Tooltip title="The prevision used when reducing the demonitor of a fraction">
                <TextField
                    label="Rationalise precision" 
                    value={rationalisePrecision}
                    disabled={isDecimal}
                    type="number"
                    className={classes.textField}
                    onChange={onRationalisePrecisionChanged} />
            </Tooltip>

                    
        </Fragment>
    )
}

DisplayMethod.propTypes = {
    isDecimal: PropTypes.bool.isRequired,
    decimalPrecision: PropTypes.number.isRequired,
    isFractionRounded: PropTypes.bool.isRequired,
    fractionDenominators: PropTypes.arrayOf(PropTypes.number).isRequired,
    isFractionRationalised: PropTypes.bool.isRequired,
    rationalisePrecision: PropTypes.number.isRequired,
    fromFloatPrecision: PropTypes.number.isRequired,
    onStyleChanged: PropTypes.func.isRequired
}

export default withStyles(styles)(DisplayMethod)