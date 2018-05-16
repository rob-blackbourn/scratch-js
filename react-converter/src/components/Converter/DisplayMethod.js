import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from 'material-ui/Switch'
import Checkbox from 'material-ui/Checkbox'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
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

class DisplayMethod extends Component {

    static propTypes = {
        isDecimal: PropTypes.bool.isRequired,
        decimalPrecision: PropTypes.number.isRequired,
        isFractionRounded: PropTypes.bool.isRequired,
        fractionDenominators: PropTypes.arrayOf(PropTypes.number).isRequired,
        isFractionRationalised: PropTypes.bool.isRequired,
        rationalisePrecision: PropTypes.number.isRequired,
        fromFloatPrecision: PropTypes.number.isRequired,
        onStyleChanged: PropTypes.func.isRequired
    }

    state = {
        anchorEl: null
    }

    handleRoundingMenuClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleRoundingMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    onIsDecimalChanged = (event, checked) => {
        const isDecimal = checked
        this.props.onStyleChanged(
            isDecimal,
            this.props.decimalPrecision,
            this.props.isFractionRounded,
            this.props.fractionDenominators,
            this.props.isFractionRationalised,
            this.props.rationalisePrecision,
            this.props.fromFloatPrecision)
    }

    onDecimalPrecisionChanged = (event) => {
        const decimalPrecision = Math.trunc(Number.parseFloat(event.target.value))
        this.props.onStyleChanged(
            this.props.isDecimal,
            decimalPrecision,
            this.props.isFractionRounded,
            this.props.fractionDenominators,
            this.props.isFractionRationalised,
            this.props.rationalisePrecision,
            this.props.fromFloatPrecision)
    }

    onIsFractionRoundedChanged = (event, checked) => {
        const isFractionRounded = checked
        this.props.onStyleChanged(
            this.props.isDecimal,
            this.props.decimalPrecision,
            isFractionRounded,
            this.props.fractionDenominators,
            this.props.isFractionRationalised,
            this.props.rationalisePrecision,
            this.props.fromFloatPrecision)
    }

    onFractionDenominatorsChanged = (event, checked) => {
        const denominator = Math.trunc(Number.parseFloat(event.target.value))

        if (Number.isNaN(denominator)) {
            return
        }

        const fractionDenominators = checked
            ? [...this.props.fractionDenominators, denominator].sort()
            : this.props.fractionDenominators.filter(x => x !== denominator)

        this.props.onStyleChanged(
            this.props.isDecimal,
            this.props.decimalPrecision,
            this.props.isFractionRounded,
            fractionDenominators,
            this.props.isFractionRationalised,
            this.props.rationalisePrecision,
            this.props.fromFloatPrecision)
    }

    onIsFractionRationalisedChanged = (event, checked) => {
        const isFractionRationalised = checked
        this.props.onStyleChanged(
            this.props.isDecimal,
            this.props.decimalPrecision,
            this.props.isFractionRounded,
            this.props.fractionDenominators,
            isFractionRationalised,
            this.props.rationalisePrecision,
            this.props.fromFloatPrecision)
    }

    onRationalisePrecisionChanged = (event) => {
        const rationalisePrecision = Math.trunc(Number.parseFloat(event.target.value))
        this.props.onStyleChanged(
            this.props.isDecimal,
            this.props.decimalPrecision,
            this.props.isFractionRounded,
            this.props.fractionDenominators,
            this.props.isFractionRationalised,
            rationalisePrecision,
            this.props.fromFloatPrecision)
    }

    onFromFloatPrecisionChanged = (event) => {
        const fromFloatPrecision = Math.trunc(Number.parseFloat(event.target.value))
        this.props.onStyleChanged(
            this.props.isDecimal,
            this.props.decimalPrecision,
            this.props.isFractionRounded,
            this.props.fractionDenominators,
            this.props.isFractionRationalised,
            this.props.rationalisePrecision,
            fromFloatPrecision)
    }

    render() {
        const { classes} = this.props
        const { anchorEl } = this.state
    
        return (
            <Fragment>
                <FormControlLabel
                    className={classes.formControl}
                    label='Show as a decimal'
                    control={
                        <Switch 
                            checked={this.props.isDecimal}
                            onChange={this.onIsDecimalChanged}
                        />
                    }
                />
    
                <br />
    
                <TextField
                    label="Decimal precision" 
                    value={this.props.decimalPrecision}
                    disabled={!this.props.isDecimal}
                    type="number"
                    className={classes.textField}
                    onChange={this.onDecimalPrecisionChanged} />
    
                <br />
    
                <FormControlLabel
                    className={classes.formControl}
                    label='Is Rounded'
                    disabled={this.props.isDecimal}
                    control={
                        <Fragment>
                        <Switch 
                            disabled={this.props.isDecimal}
                            checked={this.props.isFractionRounded}
                            onChange={this.onIsFractionRoundedChanged}
                        />
                        <IconButton 
                            disabled={this.props.isDecimal}
                            onClick={this.handleRoundingMenuClick}>
                            <MoreVertIcon />
                        </IconButton>
                        </Fragment>
                    }
                />
    
                <br />
    
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleRoundingMenuClose}>

                    <MenuItem>
                        <FormControlLabel
                            className={classes.formCheckboxControl}
                            label={<Fraction numerator={1} denominator={2} />}
                            control={
                                <Checkbox
                                    checked={this.props.fractionDenominators.includes(2)}
                                    value="2"
                                    onChange={this.onFractionDenominatorsChanged} />
                            } />
                    </MenuItem>

                    <MenuItem>
                        <FormControlLabel
                            className={classes.formCheckboxControl}
                            label={<Fraction numerator={1} denominator={3} />}
                            control={
                                <Checkbox
                                    checked={this.props.fractionDenominators.includes(3)}
                                    value="3"
                                    onChange={this.onFractionDenominatorsChanged} />
                            } />
                    </MenuItem>

                    <MenuItem>
                        <FormControlLabel
                            className={classes.formCheckboxControl}
                            label={<Fraction numerator={1} denominator={4} />}
                            control={
                                <Checkbox
                                    checked={this.props.fractionDenominators.includes(4)}
                                    value="4"
                                    onChange={this.onFractionDenominatorsChanged} />
                            } />
                    </MenuItem>

                    <MenuItem>
                        <FormControlLabel
                            className={classes.formCheckboxControl}
                            label={<Fraction numerator={1} denominator={6} />}
                            control={
                                <Checkbox
                                    checked={this.props.fractionDenominators.includes(6)}
                                    value="6"
                                    onChange={this.onFractionDenominatorsChanged} />
                            } />
                    </MenuItem>

                    <MenuItem>
                        <FormControlLabel
                            className={classes.formCheckboxControl}
                            label={<Fraction numerator={1} denominator={8} />}
                            control={
                                <Checkbox
                                    checked={this.props.fractionDenominators.includes(8)}
                                    value="8"
                                    onChange={this.onFractionDenominatorsChanged} />
                            } />
                    </MenuItem>

                    <MenuItem>
                        <FormControlLabel
                            className={classes.formCheckboxControl}
                            label={<Fraction numerator={1} denominator={12} />}
                            control={
                                <Checkbox
                                    checked={this.props.fractionDenominators.includes(12)}
                                    value="12"
                                    onChange={this.onFractionDenominatorsChanged} />
                            } />
                    </MenuItem>

                    <MenuItem>
                        <FormControlLabel
                            className={classes.formCheckboxControl}
                            label={<Fraction numerator={1} denominator={16} />}
                            control={
                                <Checkbox
                                    checked={this.props.fractionDenominators.includes(16)}
                                    value="16"
                                    onChange={this.onFractionDenominatorsChanged} />
                            } />
                    </MenuItem>
    
                </Menu>
    
                <br />
    
                <Tooltip title="The precision used when converting from a decimal to a fraction">
                    <TextField
                        label="From decimal precision" 
                        value={this.props.fromFloatPrecision}
                        disabled={this.props.isDecimal}
                        type="number"
                        className={classes.textField}
                        onChange={this.onFromFloatPrecisionChanged} />
                </Tooltip>
    
                <br />
    
                <FormControlLabel
                    className={classes.formControl}
                    label='Rationalise fraction'
                    control={
                        <Switch 
                            disabled={this.props.isDecimal}
                            checked={this.props.isFractionRationalised}
                            onChange={this.onIsFractionRationalisedChanged}
                        />
                    }
                />
    
                <br />
    
                <Tooltip title="The prevision used when reducing the demonitor of a fraction">
                    <TextField
                        label="Rationalise precision" 
                        value={this.props.rationalisePrecision}
                        disabled={this.props.isDecimal}
                        type="number"
                        className={classes.textField}
                        onChange={this.onRationalisePrecisionChanged} />
                </Tooltip>
    
                        
            </Fragment>
        )        
    }
}

export default withStyles(styles)(DisplayMethod)