import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
  },
})

class CheckBoxGroup extends React.Component {
  constructor(props) {
    super(props)

    const { selection } = props

    this.state = {
      selection,
    }
  }

  handleChanged(name, checked) {
    this.props.onChange({ ...this.props.selection, [name]: checked })
  }

  render() {
    const { selection } = this.props

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

CheckBoxGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  selection: PropTypes.objectOf(PropTypes.bool).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(CheckBoxGroup)
