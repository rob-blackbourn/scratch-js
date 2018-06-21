import { Router } from 'express'

const router = Router()

router.get('/:id', async (req, res, next) => {
  try {
    const db = req.app.locals.connection.db('example2')
    const foods = db.collection('foods')
    const id = req.params['id']
    const food = await foods.findOne({_id: id})
    res.json(food)
  } catch (error) {
    next(error)
  }
})

router.get('/group/:group', async (req, res, next) => {
  try {
    const db = req.app.locals.connection.db('example2')
    const foods = db.collection('foods')
    const group = req.params['group']
    const foodsInGroup = await foods.find({group: group}).toArray()
    res.json(foodsInGroup)
  } catch (error) {
    next(error)
  }
})

export default router
