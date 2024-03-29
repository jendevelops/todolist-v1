//jshint esversion:8

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();

//this line of code needs to go after the app const was declared
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const items = [];
const workItems = [];


app.get("/", function(req, res) {
  const day = date.getDay();
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.post("/", function(req, res){
  const item = req.body.nextItem;
  console.log(req.body);

  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
});

app.post("/work", function(req, res){
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
})
