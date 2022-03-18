// import dependencies
const mongoose = require('./connection')

// import user model for populate
const notesSchema = require('./notes')
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const myVillagersSchema = new Schema(
    {
        name: {type:String, required: true},
        personality: {type:String, required: true},
        birthday: {type:String, required: true}, 
        //* doesn't log the num # after month *//
        //birthday: {type:[String], required: true, default:[]} <-- doesn't work
        species: {type:String, required: true},
        gender: {type:String, required: true},
        subtype: {type:String, required: true},
        hobby: {type:String, required: true},
        catchPhrase: {type:String, required: true},
        iconUrl: {type:String, required: true}, 
        imgUrl: {type:String, required: true},
        bubbleColor: {type:String, required: true},
        textColor: {type:String, required: true},
        saying: {type:String, required: true},
        // hasOwned: { type: Boolean, required: true },
        // unsure atm, will thinking about later ^^^
        owner: {
            type: Schema.Types.ObjectID,
            ref: 'User',
        },
        notes: [notesSchema]
    },
	{ timestamps: true }
)

const MyVillagers = model('MyVillagers', myVillagersSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = MyVillagers