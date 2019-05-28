import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import LinearProgress from '@material-ui/core/LinearProgress'
import InfiniteScroll from 'react-infinite-scroller'
import { LoremIpsum } from 'lorem-ipsum'

const styles = theme => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap'
  },
  header: {
    flexShrink: 0
  },
  body: {
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '1em'
  },
  footer: {
    flexShrink: 0
  }
})

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function randomInt (min, max) {
  const range = max - min
  const value = min + Math.random() * range
  return Math.floor(value)
}

const names = ['Tom', 'Dick', 'Harry']

function randomName () {
  return names[randomInt(0, names.length - 1)]
}

function randomDateInPastYear (now) {
  const secondsInYear = 365 * 24 * 60 * 60
  return new Date(now.valueOf() - Math.floor(365 * secondsInYear * Math.random()))
}

function generateMessages (now, count) {
  const lorem = new LoremIpsum()
  const messages = []
  for (let i = 0; i < count; ++i) {
    messages.push({
      timestamp: randomDateInPastYear(now),
      name: randomName(),
      content: lorem.generateSentences()
    })
  }
  return messages.filter(x => x.timestamp.valueOf())
}

class Chat2 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      content: '',
      page: 0,
      hasMoreItems: true,
      messages: []
    }
    console.log('done')
  }

  messagesEnd = React.createRef()

  loadMore = async (page) => {
    await sleep(2000)
    const { messages } = this.state
    const date = messages.length === 0 ? new Date() : new Date(Math.min(...messages.map(x => x.timestamp.valueOf())))
    this.setState({ messages: [...generateMessages(date, 10), ...messages] })
  }

  onSubmit = async event => {
    event.preventDefault()

    const name = randomName()

    this.setState((state, props) => (
      {
        content: '',
        messages: [
          ...state.messages,
          {
            timestamp: new Date(),
            name,
            content: state.content
          }
        ]
      }), this.scrollToLastMessage)
  }

  scrollToLastMessage = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  componentDidMount () {
    this.scrollToLastMessage()
  }

  render () {
    const { classes } = this.props
    const { content, messages, hasMoreItems } = this.state

    return (
      <div className={classes.container}>

        <header className={classes.header}>
          <Typography variant='h1'>Example</Typography>
        </header>

        <div className={classes.body} id='scrollId'>

          <InfiniteScroll
            loadMore={this.loadMore}
            hasMore={hasMoreItems}
            loader={<LinearProgress key={-1} />}
            isReverse
            initialLoad
            useWindow={false}
          >
            {messages.map((message, index) => (
              <Card key={index}>
                <CardHeader
                  title={message.name}
                  titleTypographyProps={({ variant: 'h5' })}
                  subheader={message.timestamp.toLocaleString()}
                />
                <CardContent>
                  <Typography component='p'>{message.content}</Typography>
                </CardContent>
              </Card>
            ))}
            <div key={messages.length} ref={this.messagesEnd} />
          </InfiniteScroll>
        </div>

        <footer className={classes.footer}>
          <form component='fieldset' onSubmit={this.onSubmit}>
            <FormLabel component='legend'>
              Some Legend
            </FormLabel>
            <FormGroup>
              <TextField
                label='Message'
                className={classes.textField}
                value={content}
                onChange={this.handleChange('content')}
                margin='normal'
              />
            </FormGroup>
          </form>
        </footer>

      </div>
    )
  }
}

Chat2.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Chat2)
