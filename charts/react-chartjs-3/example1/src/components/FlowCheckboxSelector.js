import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CheckBoxGroup from './CheckBoxGroup'
import { fetchNames } from '../data'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
  },
})

class FlowCheckboxSelector extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selection: {},
    }
  }

  async componentDidMount() {
    const names = await fetchNames()
    const selection = names.reduce((obj, name) => {
      obj[name] = true
      return obj
    }, {})
    this.setState({ selection }, () => this.nofifyListener(selection))
  }

  handleChange = selection => {
    this.setState({ selection }, () => this.nofifyListener(selection))
  }

  nofifyListener = selection => {
    this.props.onChange(
      Object.entries(selection)
        .filter(([name, checked]) => checked)
        .map(([name, checked]) => name)
    )
  }

  render() {
    const { selection } = this.state

    return <CheckBoxGroup selection={selection} onChange={this.handleChange} />
  }
}

FlowCheckboxSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(FlowCheckboxSelector)
