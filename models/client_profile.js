const mongoose=require("mongoose");

const clientSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone_no: {
        type: String,
        maxLength: 10,
        required: true,
    },
    email_addr: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    aadhar_no: {
        type: String,
        maxLength: 16,
        required: true,
    },
    password: {
        type: String,
        maxLength: 20,
        required: true,
    },
    case_requirement: {
        type: String,
    },
});

const client_profile=mongoose.model("client_profile", clientSchema);
module.exports=client_profile;
