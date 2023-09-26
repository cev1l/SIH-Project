const mongoose=require("mongoose");

const document_writer_profile_Schema=new mongoose.Schema({
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
    govt_verification_no: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        maxLength: 20,
        required: true,
    },
});

const document_writer_profile=mongoose.model("document_writer_profile", document_writer_profile_Schema);
module.exports=document_writer_profile;