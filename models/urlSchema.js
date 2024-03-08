const {Schema,model, default: mongoose} = require("mongoose");
const user = require("./userSchema");

const urlSchema = new Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    createdBy:{
            type: mongoose.SchemaTypes.ObjectId,
            ref:'user',
            required:true,
    },
    visitHistory: [{
        timestamp:
        {
            type: Number
        }
    }],

}, { timestamps: true }
)

const URL = model("url",urlSchema);
module.exports = URL;