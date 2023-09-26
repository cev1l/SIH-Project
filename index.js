const express=require("express");
const app=express();
const mongoose = require("mongoose");
const path=require("path");
const client_profile= require("./models/client_profile.js");
const advocate_profile= require("./models/advocate_profile.js");
const arbitrator_profile= require("./models/arbitrator_profile.js");
const document_writer_profile= require("./models/document_writer_profile.js");
const mediator_profile= require("./models/mediator_profile.js");
const notary_profile= require("./models/notary_profile.js");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));



main()
    .then(()=>{
        console.log("Connection succcessfull");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://abc:abc@sih.xvuhzbg.mongodb.net/?retryWrites=true&w=majority');
}

// Index Route for Client
// app.get("/client_login", async(req, res)=>{
//     let email
// })




//Client side Work
app.get("/client/old_client", (req, res) => {
    res.render("old_client.ejs");
});

app.post("/client/new_client", (req, res)=>{
    let {username, first_name, last_name, phone_no, email_addr, age, aadhar_no, password}=req.body;
    let newID=new client_profile({
        username: username,
        first_name: first_name,
        last_name: last_name,
        phone_no: phone_no,
        email_addr: email_addr,
        age: age,
        aadhar_no: aadhar_no,
        password:password,
    });
    newID.
        save().
        then((res)=>{
        console.log("Saved");
    })
    .catch((err)=>{
        console.log(err);
    });    
    res.redirect("/client/new_client");
});

app.get("/client/new_client", (req, res) => {
    res.render("new_client.ejs");
});

app.get("/client", (req, res)=>{
    res.render("client.ejs");
});


//Service Provider work
app.get("/service_provider/new_service_provider", (req, res)=>{
    res.render("new_service_provider.ejs");
});

app.get("/service_provider/login", (req, res)=>{
    res.render("service_provider_login.ejs");
});
app.post("/service_provider/login", async (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username exists in any of the collections.
    const advocateProfile = await advocate_profile.findOne({ username });
    const arbitratorProfile = await arbitrator_profile.findOne({ username });
    const documentWriterProfile = await document_writer_profile.findOne({username,});
    const mediatorProfile = await mediator_profile.findOne({ username });
    const notaryProfile = await notary_profile.findOne({ username });
  
    // If the username doesn't exist, redirect the user to the
    // `/service_provider/new_service_provider` page.
    if (
      !advocateProfile &&
      !arbitratorProfile &&
      !documentWriterProfile &&
      !mediatorProfile &&
      !notaryProfile
    ) {
      return res.redirect("/service_provider/new_service_provider");
    }
  
    // Check if the password is correct.
    if (
      (advocateProfile && (await advocate_profile.findOne({password}))) ||
      (arbitratorProfile && (await arbitrator_profile.findOne({password}))) ||
      (documentWriterProfile && (await document_writer_profile.findOne({password}))) ||
      (mediatorProfile && (await mediator_profile.findOne({password}))) ||
      (notaryProfile && (await notary_profile.findOne({password})))
    ) {
      // If the password is correct, log the user in and redirect them to the profile page.
    //   req.session.user = advocateProfile || arbitratorProfile || documentWriterProfile || mediatorProfile || notaryProfile;
      res.redirect("/profile");
    } else {
      // If the password is incorrect, send an error message to the user.
      return res.render("login", {
        errorMessage: "Incorrect password.",
      });
    }
  });
  
  
  

app.get("/service_provider", (req, res)=>{
    res.render("service_provider.ejs");
});

app.get("/service_provider/new_advocate", (req, res)=>{
    res.render("new_advocate.ejs");
});
app.post("/service_provider/new_advocate", (req, res)=>{
    let {username, first_name, last_name, phone_no, email_addr, age, aadhar_no, govt_verification_no, password}=req.body;
    let newID=new advocate_profile({
        username: username,
        first_name: first_name,
        last_name: last_name,
        phone_no: phone_no,
        email_addr: email_addr,
        age: age,
        aadhar_no: aadhar_no,
        govt_verification_no: govt_verification_no,
        password: password,
    });
    newID.
        save().
        then((res)=>{
        console.log("Saved");
        res.send(newID);
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get("/service_provider/new_arbitrator", (req, res)=>{
    res.render("new_arbitrator.ejs");
});
app.post("/service_provider/new_arbitrator", (req, res)=>{
    let {username, first_name, last_name, phone_no, email_addr, age, aadhar_no, govt_verification_no, password}=req.body;
    let newID=new arbitrator_profile({
        username: username,
        first_name: first_name,
        last_name: last_name,
        phone_no: phone_no,
        email_addr: email_addr,
        age: age,
        aadhar_no: aadhar_no,
        govt_verification_no: govt_verification_no,
        password: password,
    });
    newID.
        save().
        then((res)=>{
        console.log("Saved");
        res.send(newID);
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get("/service_provider/new_document_writer", (req, res)=>{
    res.render("new_document_writer.ejs");
});
app.post("/service_provider/new_document_writer", (req, res)=>{
    let {username, first_name, last_name, phone_no, email_addr, age, aadhar_no, govt_verification_no, password}=req.body;
    let newID=new document_writer_profile({
        username: username,
        first_name: first_name,
        last_name: last_name,
        phone_no: phone_no,
        email_addr: email_addr,
        age: age,
        aadhar_no: aadhar_no,
        govt_verification_no: govt_verification_no,
        password: password,
    });
    newID.
        save().
        then((res)=>{
        console.log("Saved");
        res.send(newID);
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get("/service_provider/new_mediator", (req, res)=>{
    res.render("new_mediator.ejs");
});
app.post("/service_provider/new_mediator", (req, res)=>{
    let {username, first_name, last_name, phone_no, email_addr, age, aadhar_no, govt_verification_no, password}=req.body;
    let newID=new mediator_profile({
        username: username,
        first_name: first_name,
        last_name: last_name,
        phone_no: phone_no,
        email_addr: email_addr,
        age: age,
        aadhar_no: aadhar_no,
        govt_verification_no: govt_verification_no,
        password: password,
    });
    newID.
        save().
        then((res)=>{
        console.log("Saved");
        res.send(newID);
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get("/service_provider/new_notary", (req, res)=>{
    res.render("new_notary.ejs");
});
app.post("/service_provider/new_notary", (req, res)=>{
    let {username, first_name, last_name, phone_no, email_addr, age, aadhar_no, govt_verification_no, password}=req.body;
    let newID=new notary_profile({
        username: username,
        first_name: first_name,
        last_name: last_name,
        phone_no: phone_no,
        email_addr: email_addr,
        age: age,
        aadhar_no: aadhar_no,
        govt_verification_no: govt_verification_no,
        password: password,
    });
    newID.
        save().
        then((res)=>{
        console.log("Saved");
        res.send(newID);
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get("/", (req, res)=>{
    res.render("home.ejs");
});

app.get("/profile",(req, res)=>{
    res.render("profile.ejs");
})
app.listen(8080, ()=>{
    console.log("Server is listening on Port 8080");
});