// Import Dependencies
const express = require('express')
const fetch = require('node-fetch')
// const Example = require('../models/example')

// Create router
const router = express.Router()

// Router Middleware
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

// Routes

// index VILLAGERS
router.get('/', (req, res) => {
    // res.send("This page is working")
    res.render('villagers/index')	
})

router.post("/", (req, res) => {
    const villager = req.body.villager
    // const url = "http://acnhapi.com/v1/villagers"
    fetch("http://acnhapi.com/v1/villagers")
        .then(response => {
            // console.log(response)
            return response.json()   
        })
        .then(data => {
            // console.log(data)
            // console.log('this is the first villager', data.name)
        })
        .catch(error => {
            console.log(error)
            res.json({error})
        })
})

// show route
// router.get('/:id', (req, res) => {
//     // res.send("this page is working")
// 	const exampleId = req.params.id
// 	Example.findById(exampleId)
// 		.then(example => {
//             const {username, loggedIn, userId} = req.session
// 			res.render('examples/show', { example, username, loggedIn, userId })
// 		})
// 		.catch((error) => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// Export the Router
module.exports = router
