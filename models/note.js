// import dependencies
const mongoose = require('./connection')

// import user model for populate
// const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const noteSchema = new Schema(
	{
		body: { 
            type: String, 
            required: true 
        },
		author: {
			type: Schema.Types.ObjectID,
			ref: 'User',
            required: true
		}
	},
	{ timestamps: true }
)

// const Note = model('Note', noteSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = noteSchema