const mongoose = require('mongoose');
const infoschema = mongoose.Schema({
    Name : {
        type : String,
        required : true,
        trim : true
    },
    Age : {
        type : String,
        required :true
    },
    City : {
        type : String,
        required : true
    },
    CreatedTime : {
        type : Date,
        default: Date.now
    },
    Image : {
        type : Object,
        required : true
    }
})
module.exports=mongoose.model("info",infoschema);