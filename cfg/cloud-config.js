

const loadCert = (filePath) => {

	if (filePath) {
		const fs = require('fs')
		return fs.readFileSync(filePath)

	}
}
const ca = loadCert("cfg/compose-cacert.txt")


console.log("CA:", ca)

// RethinkDB settings
exports.host = "aws-us-east-1-portal.5.dblayer.com";    // RethinkDB host
exports.port = 19025;          // RethinkDB driver port
exports.authKey = "3f8e92de0283df2dd49d4909cd101867";
exports.ssl = {ca}

// Express settings
exports.expressPort = 4000;    // Port used by express
exports.debug = true;          // Debug mode
exports.network = '127.0.0.1'  // Network the node app will run on

