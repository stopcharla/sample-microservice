const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersDataSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String
    },
    userId:{
        type: String,

    }
});

var usersModel = mongoose.model("users", usersDataSchema);

module.exports = usersModel;