/*require('ts-node/register');

require('./src/server');*/
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost";

MongoClient.connect(url, function(err, obj) {
  if (err) throw err;
  var db = obj.db("themes");

  var query = { name: "Theme" };
  db.collection("theme-1").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });
});












