const express = require('express');
const app = express();
const path = require('path');
const uuid = require('uuid');
const uuidv4 = uuid.v4;


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));

app.use(function middle(req,res,next) {
    res.locals.display = false;
    next();
})

app.get('/',(req,res)=>{
    res.render("home");
})

app.post('/newName',(req,res)=>{
    const {username} = req.body;
    res.locals.display = true; 
    let currentDate = new Date();
    let date = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/"+currentDate.getFullYear();
    let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    res.render("home",{unqiue_Id: uuidv4(), name: username, date:date,time:time});
})


app.listen(3000);

