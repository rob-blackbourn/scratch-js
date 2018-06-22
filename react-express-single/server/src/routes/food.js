import { Router } from 'express'

export default passport => {

  const router = Router()

  function getToken (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ')
      if (parted.length === 2) {
        return parted[1]
      }
    }
  
    return null
  }
  
  router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    var token = getToken(req.headers)
    if (!token) {
      return res.status(403).send({success: false, msg: 'Unauthorized.'})
    }
  
    try {
      const id = req.params['id']
      const food = await req.app.locals.foods.findOne({_id: id})
      res.json(food)
    } catch (error) {
      next(error)
    }
  })
  
  router.get('/group/:group', async (req, res, next) => {
  
    var token = getToken(req.headers)
    if (!token) {
      return res.status(403).send({success: false, msg: 'Unauthorized.'})
    }
  
    try {
      const group = req.params['group']
      const foodsInGroup = await req.app.locals.foods.find({group: group}).toArray()
      res.json(foodsInGroup)
    } catch (error) {
      next(error)
    }
  })

  return router
}
