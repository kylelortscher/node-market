var express = require('express')
var app = express();


app.get("/", funciton(req, res){
	res.send("hello");
});

if(module === require.main) {
	var server = app.listen(process.env.PORT || 8080, function () {
		var host = server.address().address;
		var port = server.address().port;
		console.log("App Launched")
	});
}