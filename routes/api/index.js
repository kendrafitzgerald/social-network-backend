const router = require('express').Router()
//require user routes
const userRoutes = require('./userRoutes')
//require thought routes
const thoughtRoutes = require('./thoughtRoutes')
//path when accessing user data
router.use('/users', userRoutes)
//path when accessing thought data
router.use('/thoughts', thoughtRoutes)

module.exports = router