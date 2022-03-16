//============================================//
// Import Dependencies                   
//============================================//
const express = require('express')
// don't need fetch because this is the modleschema route
// const fetch = require('node-fetch')
// const MyVillagers = require('../models/example')

//============================================//
// Create Router              
//============================================//
const router = express.Router()

//============================================//
// Router Middleware               
//============================================//
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})

//============================================//
// ROUTES                                 
//============================================//

// INDEX ROUTE ------------------------------/
// index my villagers (favorites)
router.get('/', (req, res) => {
    const username = req.session.username
	const loggedIn = req.session.loggedIn
    // res.send("This page is working")
    res.render('myVillagers/index', { username, loggedIn })	
})



//============================================//
//   EXPORT ROUTER
//============================================//
module.exports = router