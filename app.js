// var http = require('http'); // Import Node.js core module
const fs = require('fs');
const path = require('path');
const express = require("express");

const app = express();

app.use(express.urlencoded({extended:false}));

app.get("/currenttime", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>");
});
app.get("/", function (req, res) {
  res.send(
    '<form action ="/store-user" method="post"><label>your name </label><input type="text" name ="username"><button>submit</button></form>'
  );
});
app.post("/store-user", function (req, res) {
  const userName = req.body.username;
  console.log(userName);

  const filepath=path.join(__dirname, 'data','users.json');

  const filedata = fs.readFileSync(filepath);

  const existingUsers =JSON.parse(filedata);

  existingUsers.push(userName);

  fs.writeFileSync(filepath,JSON.stringify(existingUsers));
  res.send('<h1>Username stored</h1>');
});

app.get('/users',function (req,res){
    const filepath=path.join(__dirname, 'data','users.json');

  const filedata = fs.readFileSync(filepath);

  const existingUsers =JSON.parse(filedata);



  let responsedata ='<ul';
  for(const user of existingUsers){
    responsedata +='<li>'+user+'</li>';
  }
  responsedata +='</ul>';
  res.send(responsedata);

});
app.listen(3001);

/*
var server = http.createServer(function (req, res) {   //create web server
    if (req.url == '/') { //check the URL of the current request
        
        // set response header
        //res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // set response content    
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    
    }
    else if (req.url == "/student") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is student Page.</p></body></html>');
        res.end();
    
    }
    else if (req.url == "/admin") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is admin Page.</p></body></html>');
        res.end();
    
    }
    else
        res.end('Invalid Request!');

});

server.listen(5001); //6 - listen for any incoming requests

console.log('Node.js web server at port 5001 is running..')
*/
