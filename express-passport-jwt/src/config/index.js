export default {
  authentication: {
    secret: 'nodeauthsecret',
    expiresIn: '24h',
    issuer: 'http://www.jetblack.net',
    saltOrRounds: 10,
    defaultPermissions: [
      {
        target: 'public',
        roles: [
          'guest'
        ]
      }
    ]
  },
  database: {
    mongoUrl: 'mongodb://localhost/node-auth'
  }
}
