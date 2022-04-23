const http = require('http')
const fs = require('fs')
const os = require('os')

const hostname = 'localhost'
const port = 3000

const server = http.createServer((req, res) => {
	const url = req.url
	if (url == '/') {
		res.writeHead(200, {'content-type': 'text/html'})

		//-> sending index.html
		const readStream = fs.createReadStream(`${__dirname}/pages/index.html`, 'utf-8', (err) => console.log('unable to read file')) 
		readStream.pipe(res)
	} else if (url == '/about') {
		res.writeHead(200, {'content-type': 'text/html'})

		//-> sending about.html
		const readStream = fs.createReadStream(`${__dirname}/pages/about.html`, 'utf-8', (err) => console.log('unable to read file'))
		readStream.pipe(res)
	} else if (url == '/sys') {
		res.statusCode = 201

		//-> storing os info into data object
		const data = JSON.stringify({
			hostname: os.hostname(),
			platform: os.platform(),
			architecture: os.arch(),
			numberOfCPUS: os.cpus(),
			networkInterfaces: os.networkInterfaces(),
			uptime: os.uptime()
		}, null, 4)
		
		console.log(data)
		//-> creating file osinfo.json
		fs.writeFile('osinfo.json', data, (err) => {
			if(err){
				console.log("unable to write file.")
			} else {
				res.end("Your os info has been saved successfully")
			}
		})

	} else {
		res.writeHead(404, {'content-type': 'text/html'})

		//-> sending 404.html
		const readStream = fs.createReadStream(`${__dirname}/pages/404.html`, 'utf-8')
		readStream.pipe(res)
	}
})

server.listen(port, hostname, () => {
	console.log(`server running at port: ${port}`)
})