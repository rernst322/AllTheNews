var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var cheerio = require("cheerio");
var request = require("request");

var PORT = 3000;

var db = require("./models");

var app = express();

app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/newsdb", {
	// useMongoClient: true
});

//db
// db.User.create({ name: "Betty White" })
// 	.then(function(dbUser){
// 		console.log(dbUser);
// 	})
// 	.catch(function(err) {
// 		console.log(err.message);
// 	});

//Routes
app.get("/", function(req, res){
	
})

console.log("Grabbing articles");

request("http://www.nytimes.com", function(error, response, html) {
	var $ = cheerio.load(html);

	var results = [];

	$("h2.story-heading").each(function(i, element){

		var title = $(element).text().trim();
		var link = $(element).find("a").attr("href");
		var summary =$(element).find("a").text().trim();

		results.push({
			title: title,
			link: link,
			summary: summary
		});
	});

	console.log(results);
});

// app.post("/articles/:id", function(req, res){
// 	db.Articles.create(req, body).then(function(dbArticle){
// 		return db.Article.find({title: })
// 	})
// })

app.listen(PORT, function() {
	console.log("App running on port " + PORT + "!");
  });