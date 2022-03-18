//============================================//
// Import Dependencies                   
//============================================//
const express = require('express')
const fetch = require('node-fetch')
const MyVillagers = require('../models/myVillagers')

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

//--- POST ROUTE ----------------------------//
// [[ USER's Villagers -> show ]]------------//
router.post("/villagers/my_villagers/:animooId", (req, res) => {
    const animooId = req.params.animooId
    console.log('This is animooId:\n', animooId)
    req.body.author = req.session.userId
    MyVillagers.findById(animooId)
        .then(animoo => {
            // then we'll send req.body to the comments array
            animoo.note.push(req.body)
            // save the fruit
            return animoo.save()
        })
        .then(animoo=> {
            res.redirect(`/villagers/my_villagers/${animoo.id}`)
        })
        // or show an error if we have one
        .catch(error => {
            console.log(error)
            res.send(error)
        })
})


//============================================//
//   EXPORT ROUTER
//============================================//
module.exports = router