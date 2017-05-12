

const loadCert = (filePath) => {

	if (filePath) {
		const fs = require('fs')
		return fs.readFileSync(filePath)

	}
}
const ca = loadCert("cfg/compose-cacert.txt")


console.log("CA:", ca)

// RethinkDB settings
exports.host = 'localhost';    // RethinkDB host
exports.port = 28015;          // RethinkDB driver port
exports.authKey = '';

// Express settings
exports.expressPort = 5000;    // Port used by express
exports.debug = true;          // Debug mode
exports.network = '127.0.0.1'  // Network the node app will run on

