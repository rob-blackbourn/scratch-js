import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Slider } from 'material-ui-slider'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  numberField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 50
  },
  numberDiv: {
    width: 300,
    margin: theme.spacing.unit
  },
  numberSlider: {},
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

class ParameterDialog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.type.startsWith('number') ? 0 : ''
    }
  }

  getMinStepMax ({ args }) {
    if (args && args.min && args.max && args.step && args.format) {
      return args
    } else {
      return {
        min: 0,
        max: 100,
        step: 5,
        format: number => (number ? `${number} %` : '')
      }
    }
  }

  renderParam = (type, name, value, classes, args) => {
    switch (type) {
      case 'number': {
        return (
          <TextField
            label={name}
            value={value}
            onChange={event => this.setState({ value: event.target.value })}
            type='number'
            InputLabelProps={{ shrink: true }}
            className={classes.numberField}
            margin='normal'
            autoFocus
          />
        )
      }
      case 'numberSlider': {
        const { min, step, max, format } = this.getMinStepMax(args)

        return (
          <div className={classes.numberDiv}>
            <Typography id='label'>
              {`${name} (${format(value)} from ${format(min)} to ${format(
                max
              )})`}
            </Typography>
            <Slider
              className={classes.slider}
              value={value}
              min={min}
              max={max}
              scaleLength={step}
              aria-labelledby='label'
              onChange={value => this.setState({ value: value })}
            />
          </div>
        )
      }
      default: {
        return (
          <TextField
            label={name}
            value={value}
            onChange={event => this.setState({ value: event.target.value })}
            type='number'
            InputLabelProps={{ shrink: true }}
            className={classes.numberField}
            margin='normal'
            autoFocus
          />
        )
      }
    }
  }

  render () {
    const {
      classes,
      title,
      message,
      name,
      type,
      onClose,
      open,
      args
    } = this.props
    const { value } = this.state

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
          {this.renderParam(type, name, value, classes, args)}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false, undefined)} color='primary'>
            Cancel
          </Button>
          <Button onClick={() => onClose(true, value)} color='primary'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

ParameterDialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['number', 'numberSlider', 'text']),
  args: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

ParameterDialog.defaultProps = {
  args: {
    min: 0,
    max: 100,
    step: 5,
    format: number => (number ? `${number} %` : '')
  }
}

export default withStyles(styles)(ParameterDialog)
