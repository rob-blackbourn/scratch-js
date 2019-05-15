import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Fetcher extends Component {
  state = {
    loading: true,
    error: null,
    data: null,
  }

  static propTypes = {
    fetcher: PropTypes.func.isRequired,
    render: PropTypes.func,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.fetcher !== prevState.fetcher) {
      return {
        data: null,
        error: null,
        loading: true,
        fetcher: nextProps.fetcher,
      }
    }

    return null
  }

  async componentDidMount() {
    const { fetcher } = this.props

    if (!!fetcher) {
      await this.fetch()
    }
  }

  async componentDidUpdate() {
    const { fetcher } = this.props
    const { data, error } = this.state

    if (!!fetcher && data === null && error === null) {
      await this.fetch()
    }
  }

  async fetch() {
    try {
      const { fetcher } = this.props

      const data = await fetcher()

      this.setState({
        loading: false,
        data,
      })
    } catch (error) {
      this.setState({
        loading: false,
        error,
      })
    }
  }

  render() {
    const { loading, error, data } = this.state
    const { render, children = render } = this.props

    if (typeof children === 'function') {
      return children({ loading, error, data })
    }

    return null
  }
}
