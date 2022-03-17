/////============================================/////
/////============================================/////
/////                                            /////
///// SEED DATA TO TEST SCHEMA FOR MY VILLAGERS! /////
/////                                            /////
/////============================================/////
//// ============================================/////


///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const MyVillagers = require('./myVillagers')

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////
// save the connection in a variable
const db = mongoose.connection;

// db.on('open', () => {
// 	// array of starter fruits
// 	const myVillagersSeed = [
//         {
//             personality: "Cyrano",
//             birthdayString: "Cranky",
//             species: "Anteater",
//             gender: "Male",
//             subtype: "B",
//             hobby: "Education",
//             catchPhrase: "ah-CHOO",,
//             iconUrl: "https://acnhapi.com/v1/icons/villagers/1",
//             imgUrl: "https://acnhapi.com/v1/images/villagers/1",
//             bubbleColor: "#194c89",
//             textColor: "#fffad4",
//             saying: "Don't punch your nose to spite your face.",
//             hasOwned: { type: Boolean, required: true },
//             owner: {
//                 type: Schema.Types.ObjectID,
//                 ref: 'User',
//             }
//         },
//         {
//             personality: {type:String, required: true},
//             birthdayString: {type:String, required: true},
//             species: {type:String, required: true},
//             gender: {type:String, required: true},
//             subtype: {type:String, required: true},
//             hobby: {type:String, required: true},
//             catchPhrase: {type:String, required: true},
//             iconUrl: {type:String, required: true},
//             imgUrl: {type:String, required: true},
//             bubbleColor: {type:String, required: true},
//             textColor: {type:String, required: true},
//             saying: {type:String, required: true},
//             hasOwned: { type: Boolean, required: true },
//             owner: {
//                 type: Schema.Types.ObjectID,
//                 ref: 'User',
//             }
//         },
//         {
//             personality: {type:String, required: true},
//             birthdayString: {type:String, required: true},
//             species: {type:String, required: true},
//             gender: {type:String, required: true},
//             subtype: {type:String, required: true},
//             hobby: {type:String, required: true},
//             catchPhrase: {type:String, required: true},
//             iconUrl: {type:String, required: true},
//             imgUrl: {type:String, required: true},
//             bubbleColor: {type:String, required: true},
//             textColor: {type:String, required: true},
//             saying: {type:String, required: true},
//             hasOwned: { type: Boolean, required: true },
//             owner: {
//                 type: Schema.Types.ObjectID,
//                 ref: 'User',
//             }
//         }
//     ]

	// when we seed data, there are a few steps involved
	// delete all the data that already exists(will only happen if data exists)
	// Fruit.remove({})
    //     .then(deletedMyVillagers => {
	// 	    console.log('this is what remove returns', deletedMyVillagers)
		    // then we create with our seed data
            MyVillagers.create(myVillagersSeed)
                .then((data) => {
                    console.log('Here are the new seed villagers', data)
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    db.close()
                })
	    // })
        // .catch(error => {
        //     console.log(error)
        //     db.close()
        // })
	// then we can send if we want to see that data
// })