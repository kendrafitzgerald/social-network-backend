//require express router
const router = require('express').Router()
//require api routes
const apiRoutes = require('./api')
//URL param to get to api routes
router.use('/api', apiRoutes)
//if issue with using route, send error message
router.use((req, res) => {
    return res.send("Something went wrong!")
})

module.exports = router