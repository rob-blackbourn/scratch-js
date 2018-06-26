import jwt from 'jsonwebtoken'

class AuthenticationController {

  constructor (userService, config) {
    this.userService = userService
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
      const user = await this.userService.create(req.body.email, req.body.password, this.defaultPermissions)
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
      const user = await this.userService.readByEmail(req.body.email)
      if (!user) {
        return res.status(401).send({success: false, msg: 'Authentication failed. User not found.'})
      }

      const isMatch = await this.userService.comparePassword(req.body.password, user.password)
      if (!isMatch) {
        return res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'})
      }

      const token = this.createToken(user)
      res.json({ success: true, token })

    } catch (error) {
      next(error)
    }
  }

  async update (req, res, next) {
    try {
      const user = await this.userService.readByEmail(req.params.email)
      if (!user) {
        return res.status(401).send({success: false, msg: 'Authentication failed. User not found.'})
      }

      const fields = {}
      if (req.body.email) {
        fields.email = req.body.email
      }
      if (req.body.permissions) {
        fields.permissions = JSON.parse(req.body.permissions)
      }

      await this.userService.update(user._id.toString(), fields)
      await this.userService.read(user._id.toString())

      res.json({ success: true, message: 'Updated' })
    } catch (error) {
      next(error)
    }
  }
}

export default AuthenticationController
