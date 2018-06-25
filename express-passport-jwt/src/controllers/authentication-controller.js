import jwt from 'jsonwebtoken'

class AuthenticationController {

  constructor (userRepository, config) {
    this.userRepository = userRepository
    this.secret = config.secret
    this.signOptions = {
      expiresIn: config.expiresIn,
      issuer: config.issuer 
    }
    this.defaultPermissions = config.defaultPermissions
  }

  async register (req, res) {
    if (!req.body.email || !req.body.password) {
      return res.json({success: false, msg: 'Please pass username and password.'})
    } 

    try {
      const user = await this.userRepository.create(req.body.email, req.body.password, this.defaultPermissions)
      const token = this.createToken(user)
      return res.json({ success: true, token })
    } catch (error) {
      return res.json({success: false, msg: error.message})
    }
  }

  createToken (user) {
    const payload = { sub: user._id.toHexString(), user: user.email }
    return jwt.sign(payload, this.secret, this.signOptions)
  }

  async login (req, res, next) {
    try {
      const user = await this.userRepository.readByEmail(req.body.email)
      if (!user) {
        return res.status(401).send({success: false, msg: 'Authentication failed. User not found.'})
      }

      const isMatch = await this.userRepository.comparePassword(req.body.password, user.password)
      if (!isMatch) {
        return res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'})
      }

      const token = this.createToken(user)
      res.json({ success: true, token })

    } catch (error) {
      next(error)
    }
  }
}

export default AuthenticationController
