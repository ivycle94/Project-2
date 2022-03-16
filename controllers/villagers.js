//============================================//
// Import Dependencies                   
//============================================//
const express = require('express')
const fetch = require('node-fetch')
// api page, dont need a model
// const Example = require('../models/example')

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
// [[ All Villagers -> index ]]
// router.get('/', (req, res) => {
//     // res.send("This page is working")
//     res.render('villagers/index')	
// })
router.get("/", (req, res) => {
    // const villagers = req.body.villagers
    // const url = "http://acnhapi.com/v1/villagers"
    fetch("http://acnhapi.com/v1/villagers")
        .then(response => {
            // console.log(response)
            return response.json()   
        })
        .then(data => {
            const username = req.session.username
			const loggedIn = req.session.loggedIn
            // method returns an array of a given object's own enumerable property values, in the same order
            // great for objects with a lot of elements
            let animalData = Object.values(data)
            // console.log("first villager in the array:", animalData[0])
            res.render('villagers/index', { animalData : animalData, username, loggedIn })
            // to test if index page shows user logged in since index.liquid was emptyand couldnt test it that way
            // res.json({ animalData, username, loggedIn })
        })
        .catch(error => {
            console.log(error)
            res.json({error})
        })
})

// [[ USER's Villagers -> index ]]
router.get('/my_villagers', (req, res) => {
    //** */ promise chain that pulls up the user's villagers(for later) **//
    // MyVillagers.find({ owner: req.session.userId })
		// .then((villagers) => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			res.render('myVillagers/index', { username, loggedIn })
                                        // ^ remember to add the ref to vilager in curly brackets later
		// })
		// show an error if there is one
		// .catch((error) => {
		// 	console.log(error)
		// 	res.json({ error })
		// })
})

// api ---> local db
// POST route
// Can make form (can hide the form-> input type= hidden)
// info for form is in get(fetch) route

// SHOW ROUTE ------------------------------/
router.get('/:id', (req, res) => {
    // res.send("this page is working")
	const animalId = req.params.id
    fetch(`http://acnhapi.com/v1/villagers/${animalId}`)
    .then(response => {
        return response.json()   
    })
    .then(data => {
        const username = req.session.username
        const loggedIn = req.session.loggedIn
        // dont need Object.value() because you're only dealing with one thing
        // let animalData = Object.values(data)
        console.log(data)
        res.render('villagers/show', { animal : data, username, loggedIn })
    })
    .catch(error => {
        console.log(error)
        res.json({error})
    })
})

//============================================//
//   EXPORT ROUTER
//============================================//
module.exports = router
