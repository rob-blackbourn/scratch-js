import React from 'react'
import PropTypes from 'prop-types'

import Downshift from 'downshift'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'

import UnitConverter from '../../converters/UnitConverter'
import { Usage } from '../../converters/Usage'

const styles = theme => ({
    selector: {
        paddingTop: 2 * theme.spacing.unit,
        margin: theme.spacing.unit,
        minWidth: 200,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    inputRoot: {
        flexWrap: 'wrap',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    iconSmall: {
        margin: theme.spacing.units,
        fontSize: 20
    }
})

function unitConverterToString(unitConverter) {
    return unitConverter
        ? `${unitConverter.authority.detail.commonName} ${unitConverter.unit.detail.singular}` 
        : ''
}
  
function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps
  
    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                },
                ...InputProps,
            }}
            {...other}
        />
    )
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index
    const isSelected = (selectedItem  === suggestion)
  
    return (
        <MenuItem
            {...itemProps}
            key={suggestion.toString()}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {unitConverterToString(suggestion)}
        </MenuItem>
    )
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.instanceOf(UnitConverter).isRequired,
}

const UnitCompleter = ({
    classes,
    text, usage,
    suggestions,
    onSuggestionChanged,
    onConverterChanged
}) => {

    return (
        <Downshift
            className={classes.selector}
            itemToString={unitConverterToString}
            onInputValueChange={inputValue => onSuggestionChanged(inputValue, usage, 5)}
            onChange={onConverterChanged}
        >
            {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
                <div className={classes.container}>
                    {renderInput({
                        fullWidth: true,
                        classes,
                        InputProps: getInputProps({
                            placeholder: 'Search for a unit',
                            id: 'integration-downshift-simple',
                        }),
                    })}
                    {isOpen ? (
                        <Paper className={classes.paper} square>
                            {suggestions.map((suggestion, index) =>
                                renderSuggestion({
                                    suggestion,
                                    index,
                                    itemProps: getItemProps({ item: suggestion }),
                                    highlightedIndex,
                                    selectedItem,
                                }),
                            )}
                        </Paper>
                    ) : null}
                </div>
            )}
        </Downshift>
    )
}

UnitCompleter.propTypes = {
    classes: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    usage: PropTypes.instanceOf(Usage),
    suggestions: PropTypes.arrayOf(PropTypes.instanceOf(UnitConverter)),
    onSuggestionChanged: PropTypes.func.isRequired,
    onConverterChanged: PropTypes.func.isRequired
}

export default withStyles(styles)(UnitCompleter)