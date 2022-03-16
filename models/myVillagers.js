// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const myVillagersSchema = new Schema(
	{
        personality: {String, required: true},
        birthdayString: {String, required: true},
        species: {String, required: true},
        gender: {String, required: true},
        subtype: {String, required: true},
        hobby: {String, required: true},
        catchPhrase: {String, required: true},
        iconUrl: {String, required: true},
        imgUrl: {String, required: true},
        bubbleColor: {String, required: true},
        textColor: {String, required: true},
        saying: {String, required: true},
		hasOwned: { type: Boolean, required: true },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const myVillagers = model('myVillagers', myVillagersSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Example