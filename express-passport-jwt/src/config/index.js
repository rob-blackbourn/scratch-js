export default {
  authentication: {
    secret: 'nodeauthsecret',
    expiresIn: '24h',
    issuer: 'http://www.jetblack.net'
  },
  database: {
    mongoUrl: 'mongodb://localhost/node-auth'
  }
}
