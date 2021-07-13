const database = require("./database.js");

const server = require('http').createServer((req, res) => {
	console.log(req.url, req.method);
	if (req.method == "GET") res.end(database[req.url])

	if (req.method == "POST") {

		let data = ''

		req.on('data', chunk => data += chunk);
		req.on('end', () => {
			console.log(data);
			database[req.url] = data;
			res.end(data);
		});
	}
}).listen(8080);

console.log(server);
