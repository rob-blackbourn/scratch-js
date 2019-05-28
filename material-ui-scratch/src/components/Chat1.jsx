import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
// import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
// import CardActions from '@material-ui/core/CardActions'
// import { animateScroll } from 'react-scroll'
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

function generateMessages (n) {
  const now = new Date()
  const lorem = new LoremIpsum()
  const messages = []
  for (let i = 0; i < n; ++i) {
    messages.push({
      timestamp: randomDateInPastYear(now),
      name: randomName(),
      content: lorem.generateSentences()
    })
  }
  return messages.filter(x => x.timestamp.valueOf())
}

class Chat1 extends React.Component {
  state = {
    content: '',
    messages: generateMessages(20)
  }

  messagesEnd = React.createRef()

  onSubmit = async event => {
    event.preventDefault()

    console.log(this.state)

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
    // animateScroll.scrollToBottom({ containerId: 'scrollId' })
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
    const { content, messages } = this.state

    return (
      <div className={classes.container}>

        <header className={classes.header}>
          <Typography variant='h1'>Example</Typography>
        </header>

        <div className={classes.body} id='scrollId'>
          {messages.map(message => (
            <Card key={message.timestamp.valueOf()}>
              <CardHeader
                title={message.name}
                subheader={message.timestamp.toLocaleString()}
              />
              <CardContent>
                <Typography component='p'>{message.content}</Typography>
              </CardContent>
            </Card>
          ))}
          <div ref={this.messagesEnd} />
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

Chat1.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Chat1)
