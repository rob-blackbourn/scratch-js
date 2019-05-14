import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
  },
}

class FlowCheckboxSelector extends React.Component {
  constructor(props) {
    super(props)

    const { names } = props

    this.state = {
      selection: names.reduce((obj, name) => {
        obj[name] = true
        return obj
      }, {}),
    }
  }

  handleChanged(name, checked) {
    this.setState(
      (state, props) => ({
        selection: { ...state.selection, [name]: checked },
      }),
      this.notifyChanged
    )
  }

  notifyChanged() {
    this.props.onChanged(
      Object.entries(this.state.selection)
        .filter(([name, checked]) => checked)
        .map(([name, checked]) => name)
    )
  }

  render() {
    const { selection } = this.state

    return (
      <FormGroup>
        {Object.entries(selection).map(([name, checked]) => (
          <FormControlLabel
            key={name}
            control={
              <Checkbox
                checked={checked}
                onChange={event =>
                  this.handleChanged(name, event.target.checked)
                }
                value={name}
              />
            }
            label={name}
          />
        ))}
      </FormGroup>
    )
  }
}

FlowCheckboxSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChanged: PropTypes.func.isRequired,
}

export default withStyles(styles)(FlowCheckboxSelector)
