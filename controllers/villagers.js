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

//--- INDEX ROUTE ----------------------------/
// [[ All Villagers -> index ]]---------------/
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
            // console.log("this is before the object.values()", data)
            // let animaData = Object.value(data) <-- also tried this
            let animalData = []
            Object.keys(data).forEach(key => {
                animalData.push(data[key])
                // animalData.push(JSON.stringify(data[key]))
            })
            // console.log("this is animalData", animalData[0].saying)
            // console.log("this is after objects.value", animalData)
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

// [[ USER's Villagers -> index ]]------------/
router.get('/my_villagers', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	MyVillagers.find({ owner: userId })
		.then(MyVillagers => {
            
			res.render('myVillagers/index', { MyVillagers, username, loggedIn })
        // console.log(MyVillagers)

		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// User's villagers index <-post- all villagers index
router.post('/my_villagers', (req, res) => {
    //** */ promise chain that pulls up the user's villagers(for later) **//
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    req.body.owner = req.session.userId
    // assign vars that match with the schema and form (villagers/index.js)
    let animoo = req.body
    console.log("this is animoo",animoo)
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
    let saying = animoo[ 'saying' ] 
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
            // res.redirect('/villagers', { animalData, username, loggedIn })

        })
        .catch(error => {
            console.log(error)
            res.json({ error })
    })	
    console.log(animoo)
})	

//--- DELETE ROUTE ---------------------------/
// [[ USER's Villagers -> delete ]]-----------/
router.delete("/my_villagers/:id", (req, res) => {
    const animooId = req.params.id
    console.log("this is villager id for DELETE\n", animooId)
    MyVillagers.findByIdAndRemove(animooId)
        .then(animoo => {
            console.log("this is villager we DELETED\n", animooId)
            res.redirect("/my_villagers")
        })
        .catch(error => {
            console.log(error)
            res.json({ error })
        })
})

//--- SHOW ROUTE -----------------------------/
// [[ All Villagers -> show ]]----------------/
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

// [[ USER's Villagers -> show ]]
router.get("/my_villagers/:id", (req, res) => {
    const animooId = req.params.id
    // console.log("This is animooId for show\n",animooId)
    MyVillagers.findById(animooId)
        .then(animoo => {
            console.log("the animoo we're looking at", animoo)
            const username = req.session.username
			const loggedIn = req.session.loggedIn
			const userId = req.session.userId

            
			res.render('myVillagers/show', { animoo, username, loggedIn, userId })
        })
        .catch(error => {
            console.log(error)
			res.json({ error })
    })  
    
})

//============================================//
//   EXPORT ROUTER
//============================================//
module.exports = router
