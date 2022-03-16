// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const myVillagersSchema = new Schema(
    {
        name: {type:String, required: true},
        personality: {type:String, required: true},
        // birthdayString: {type:String, required: true},
        // species: {type:String, required: true},
        // gender: {type:String, required: true},
        // subtype: {type:String, required: true},
        // hobby: {type:String, required: true},
        // catchPhrase: {type:String, required: true},
        // iconUrl: {type:String, required: true},
        // imgUrl: {type:String, required: true},
        // bubbleColor: {type:String, required: true},
        // textColor: {type:String, required: true},
        // saying: {type:String, required: true},
        // hasOwned: { type: Boolean, required: true },
        // unsure atm, will thinking about later ^^^
        owner: {
            type: Schema.Types.ObjectID,
            ref: 'User',
        }
    },
	{ timestamps: true }
)

const MyVillagers = model('MyVillagers', myVillagersSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = MyVillagers