var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://dg-message-board:dg-message-board@ds037990.mongolab.com:37990/dg-message-board');
mongoose.model('Message', new Schema({"name": String, "message": String}, {collection: 'messages'}));
var Message = mongoose.model('Message');


app.set("port", process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

app.get('/data', function(req,res){

    var query = req.query.messageSearch;

    if(query){
        Message.find({"name" : query}, function(err, data){
            if(err){
                console.log("ERROR! : ", err);
            }
            res.send(data);
        });

    } else {
        Message.find({}, function(err, data){
            if(err){
                console.log("ERROR! : ", err);
            }
            res.send(data);
        });
    }
});

app.post('/data', function(req,res){
    //console.log(req);
    var addedMessage = new Message({
        "name" : req.body.name,
        "message" : req.body.message
    });

    addedMessage.save(function(err, data){
        if(err) console.log(err);
        res.send(data);
    });
});

app.delete('/data', function(req,res){
    //console.log(req.body.id);

    Message.findByIdAndRemove({ "_id" : req.body.id }, function(err, data){
        if(err) console.log(err);
        res.send(data);
    });


});
app.get("/admin", function(req,res){
    var file = req.params[0] || "/views/admin.html";
    res.sendFile(path.join(__dirname, "./public", file));
});

app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "./public", file));
});

app.listen(app.get("port"), function(){
    console.log("Listening on port: ", app.get("port"));
});
