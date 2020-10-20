let api = {
	host: "aggregator.api.test.fuelup.ru",
	version: "tanker",
	key: "d389ce64-1390-402f-8d7d-d5b5ce1248fa"
};
let Request = require("./libs/Request");
let request = new Request(api.host);
let express = require("express");
let app = express();

app.use(express.static("static"));

app.get("/api/station/", (req, res) => {
	request.send(`/${api.version}/station?apikey=${api.key}`, data => {
		res.send(data);
	});
});

app.get("/api/price/", (req, res) => {
	request.send(`/${api.version}/price?apikey=${api.key}`, data => {
		res.send(data);
	});
});

app.listen(8080);