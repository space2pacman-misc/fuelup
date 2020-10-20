let https = require("https");

class Request {
	constructor(host) {
		this._host = host;
	}

	send(path, callback) {
		let options = {
			host: this._host,
			path
		}
		let request = https.request(options, this._onResponse.bind(null, callback));

		request.end();
	}

	_onResponse(callback, response) {
		let parts = "";

		response.on("data", data => {
			parts += data;
		});
		
		response.on("end", () => {
			callback(parts.toString());
		})
	}
}

module.exports = Request;