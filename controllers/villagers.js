//============================================//
// Import Dependencies                   
//============================================//
const express = require('express')
const fetch = require('node-fetch')
// api page, dont need a model
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
router.post('/my_villagers', (req, res) => {
    //** */ promise chain that pulls up the user's villagers(for later) **//
    MyVillagers.find({ owner: req.session.userId })
		.then((animalData) => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
            req.body.owner = req.session.userId

            // assign vars that match with the schema and form (villagers/index.js)
            let animoo = req.body
            let name = animoo.name
            let personality = animoo.personality
            let birthday = animoo.birthday
            //let birthday = animoo.birthday.join("") <-- doesn't work
            let species = animoo.species
            let gender = animoo.gender
            let subtype = animoo.subtype
            let hobby = animoo.hobby
            let catchPhrase = animoo.catchPhrase
            let iconUrl = animoo.iconUrl
            let imgUrl = animoo.imgUrl
            let bubbleColor = animoo.bubbleColor
            let textColor = animoo.textColor
            let saying = animoo.saying
            //let saying = animoo.saying <-- doesn't work
            // console.log(animoo)
            MyVillagers.create(animoo)
            .then(animoo => {
                console.log("villager added to user's list:",
                {
                    name,
                    personality,
                    birthday,
                    species,
                    gender,
                    subtype,
                    hobby,
                    catchPhrase,
                    iconUrl,
                    imgUrl,
                    bubbleColor,
                    textColor,
                    saying
                    
                })
                res.redirect("/villagers")
                // res.render('myVillagers/index', { animalData, username, loggedIn })
            })
            .catch(error => {
                // console.log(error)
			// res.json({ error })
            })	
		})
		.catch((error) => {
			// console.log(error)
			// res.json({ error })
		})
})

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
