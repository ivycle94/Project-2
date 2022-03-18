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

//--- INDEX ROUTE ----------------------------//
// [[ All Villagers -> index ]]---------------//
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
            let villagerArray = []
            Object.keys(data).forEach(key => {
                villagerArray.push(data[key])
                // villagerArray.push(JSON.stringify(data[key]))
            })
            // console.log("this is villagerArray", villagerArray[0].saying)
            // console.log("this is after objects.value", villagerArray)
            // console.log("first villager in the array:", villagerArray[0])
            res.render('villagers/index', { villagerArray : villagerArray, username, loggedIn })
            // to test if index page shows user logged in since index.liquid was emptyand couldnt test it that way
            // res.json({ villagerArray, username, loggedIn })
        })
        .catch(error => {
            console.log(error)
            res.json({error})
        })
})

// [[ USER's Villagers -> index ]]------------//
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
    let villager = req.body
    console.log("this is villager",villager)
    let name = villager.name
    let personality = villager.personality
    let birthday = villager.birthday
    //let birthday = villager.birthday.join("") <-- doesn't work
    let species = villager.species
    let gender = villager.gender
    let subtype = villager.subtype
    let hobby = villager.hobby
    let catchPhrase = villager.catchPhrase
    let iconUrl = villager.iconUrl
    let imgUrl = villager.imgUrl
    let bubbleColor = villager.bubbleColor
    let textColor = villager.textColor
    let saying = villager[ 'saying' ] 
    //let saying = villager.saying <-- doesn't work
    // console.log(villager)
    MyVillagers.create(villager)
        .then(villager => {
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
            // res.redirect('/villagers', { villagerArray, username, loggedIn })

        })
        .catch(error => {
            console.log(error)
            res.json({ error })
    })	
    console.log(villager)
})	

//--- EDIT ROUTE -----------------------------//
// [[ USER's Villagers -> edit ]]-------------//
router.get('/my_villagers/:id/edit', (req, res) => {
	// we need to get the id
    const { username, userId, loggedIn } = req.session
	const villagerId = req.params.id
    // console.log("this is villager/villager Id:\n", villagerId)
	MyVillagers.findById(villagerId)
		.then(villager => {
            // console.log("this is villager/villager we are editing:\n", villagerId)
			res.render('myVillagers/edit', { villager, username, loggedIn })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})
// User's villagers show <-update- edited form//

//--- DELETE ROUTE ---------------------------//
// [[ USER's Villagers -> delete ]]-----------//
router.delete("/my_villagers/:id", (req, res) => {
    const villagerId = req.params.id
    // console.log("this is villager id for DELETE\n", villagerId)
    MyVillagers.findByIdAndRemove(villagerId)
        .then(villager => {
            // console.log("The villager we deleted\n", villagerId)
            res.redirect("/villagers/my_villagers")
        })
        .catch(error => {
            console.log(error)
            res.json({ error })
        })
})

//--- SHOW ROUTE -----------------------------//
// [[ All Villagers -> show ]]----------------//
router.get('/:id', (req, res) => {
    // res.send("this page is working")
	const villagerId = req.params.id
    fetch(`http://acnhapi.com/v1/villagers/${villagerId}`)
    .then(response => {
        return response.json()   
    })
    .then(data => {
        const username = req.session.username
        const loggedIn = req.session.loggedIn
        // dont need Object.value() because you're only dealing with one thing
        // let villagerArray = Object.values(data)
        console.log(data)
        res.render('villagers/show', { villager : data, username, loggedIn })
    })
    .catch(error => {
        console.log(error)
        res.json({error})
    })
})

// [[ USER's Villagers -> show ]]
router.get("/my_villagers/:id", (req, res) => {
    const villagerId = req.params.id
    // console.log("This is villagerId for show\n",villagerId)
    MyVillagers.findById(villagerId)
        .populate("note.author", "username")
        .then(villager => {
            // console.log("the villager we're looking at", villager)
            const username = req.session.username
			const loggedIn = req.session.loggedIn
			const userId = req.session.userId

            console.log(villager)
			res.render('myVillagers/show', { villager, username, loggedIn, userId })
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
