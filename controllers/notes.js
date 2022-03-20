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
// [[ USER's Notes -> show ]]----------------//
router.post("/villagers/my_villagers/:villagerId", (req, res) => {
    const villagerId = req.params.villagerId
    // console.log('This is villagerId:\n', villagerId)
    req.body.author = req.session.userId
    console.log("this is req.params\n",req.params)
    MyVillagers.findById(villagerId)
        .then(villager => {
            // then we'll send req.body to the comments array
            villager.notes.push(req.body)
            // save the fruit
            return villager.save()
        })
        .then(villager=> {
            res.redirect(`/villagers/my_villagers/${villager.id}`)
        })
        // or show an error if we have one
        .catch(error => {
            console.log(error)
            res.send(error)
        })
})

//--- DELETE ROUTE ---------------------------//
// [[ USER's Notes -> delete ]]---------------//
router.delete('/delete/:villagerId/:notesId', (req, res) => {
    //console.log(villager)
    // first we want to parse out our ids
    const villagerId = req.params.villagerId
    console.log("this is the villager ID:\n", villagerId)
    const notesId = req.params.notesId
    console.log("NOTES ID:\n",notesId)
    MyVillagers.findById(villagerId)
        .then(villager => {
            console.log("this is the villager notes", villager.notes)
            const theNotes = villager.notes.id(notesId)
            console.log("this is the comment:\n", theNotes)
            // only delete the comment if the user who is logged in is the comment's author
            if ( theNotes.author == req.session.userId) {
                console.log(theNotes.author)
                // then we'll delete the note
                theNotes.remove()
                // return the saved villager
                return villager.save()
            } else {
                return
            }
        })
        .then(villager => {
            // redirect to the my_villagers show page
            res.redirect(`/villagers/my_villagers/${villager.id}`)
        })
        .catch(error => {
            // catch any errors
            console.log(error)
            res.send(error)
        })
})

//============================================//
//   EXPORT ROUTER
//============================================//
module.exports = router