import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import DisplayMethod from './DisplayMethod'

import uuid from '../../utils/uuid'

import { Domain } from '../../converters/Domain'
import { Authority } from '../../converters/Authority'
import { System } from '../../converters/System'
import { Unit } from '../../converters/Unit'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});
  
const UnitSelector = ({
    classes,
    isSource,
    domain, domains, onDomainChanged,
    authority, authorities, onAuthorityChanged,
    system, systems, onSystemChanged,
    name, names, onNameChanged,
    value, onValueChanged,
    style, onStyleChanged
}) => {

    const domainId = uuid()
    const authorityId = uuid()
    const systemId = uuid()
    const nameId = uuid()
    const valueId = uuid()

    return (
        <Fragment>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor={domainId}>Domain</InputLabel>
                <Select
                    value={domain || ''}
                    onChange={(args) => onDomainChanged(args.target.value, isSource)}
                    inputProps={{
                        name: 'domain',
                        id: domainId,
                    }}>

                    {domains.map(x => (
                        <MenuItem value={x} key={x}>{x.key}</MenuItem>
                    ))}

                </Select>
            </FormControl>

            <br />

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor={authorityId}>Authority</InputLabel>
                <Select
                    value={authority || ''}
                    onChange={(e) => onAuthorityChanged(e.target.value, isSource)}
                    inputProps={{
                        name: 'authority',
                        id: authorityId,
                    }}>

                    {authorities.map(x => (
                        <MenuItem value={x} key={x}>{x.key}</MenuItem>
                    ))}

                </Select>
            </FormControl>

            <br />

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor={systemId}>System</InputLabel>
                <Select
                    value={system || ''}
                    onChange={(e) => onSystemChanged(e.target.value, isSource)}
                    inputProps={{
                        name: 'system',
                        id: systemId,
                    }}>

                    {systems.map(x => (
                        <MenuItem value={x} key={x}>{x.key}</MenuItem>
                    ))}

                </Select>
            </FormControl>

            <br />

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor={nameId}>Name</InputLabel>
                <Select
                    value={name || ''}
                    onChange={(e) => onNameChanged(e.target.value, isSource)}
                    inputProps={{
                        name: 'name',
                        id: nameId,
                    }}>

                    {names.map(x => (
                        <MenuItem value={x} key={x}>{x.key}</MenuItem>
                    ))}

                </Select>
            </FormControl>

            <br />

            <FormControl className={classes.formControl}>
                <TextField
                    id={valueId}
                    label="Value"
                    className={classes.textField}
                    value={value}
                    onChange={(e) => onValueChanged(e.target.value, isSource)}
                    margin="normal" />
            </FormControl>

            <br />

            <DisplayMethod 
                isDecimal={style.isDecimal} 
                decimalPrecision={style.decimalPrecision}
                isFractionRounded={style.isFractionRounded} 
                fractionDenominators={style.fractionDenominators}
                isFractionRationalised={style.isFractionRationalised}
                rationalisePrecision={style.rationalisePrecision}
                fromFloatPrecision={style.fromFloatPrecision}
                onStyleChanged={onStyleChanged} />

        </Fragment>
    )
}

UnitSelector.propTypes = {
    isSource: PropTypes.bool.isRequired,
    domain: PropTypes.instanceOf(Domain),
    domains: PropTypes.arrayOf(PropTypes.instanceOf(Domain)).isRequired,
    onDomainChanged: PropTypes.func.isRequired,
    system: PropTypes.instanceOf(System),
    systems: PropTypes.arrayOf(PropTypes.instanceOf(System)),
    onSystemChanged: PropTypes.func.isRequired,
    authority: PropTypes.instanceOf(Authority),
    authorities: PropTypes.arrayOf(PropTypes.instanceOf(Authority)),
    onAuthorityChanged: PropTypes.func.isRequired,
    name: PropTypes.instanceOf(Unit),
    names: PropTypes.arrayOf(PropTypes.instanceOf(Unit)),
    onNameChanged: PropTypes.func.isRequired,
    value: PropTypes.string,
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
    onStyleChanged: PropTypes.func.isRequired
}

export default withStyles(styles)(UnitSelector)