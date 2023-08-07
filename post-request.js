const bodyParser = require("../util/body-parser")
const writeToFile = require("../util/writeToFile")
const min = 1000000;
const max = 9999999;



module.exports = async(req,res) => {
    if(req.url === '/api/movies' ){
        try{
            existingIds = req.body.imdbID
            let num = Math.floor(Math.random() * (max - min + 1)) + min
            console.log("post")
            let body = await bodyParser(req)
            body.imdbID = "tt"+num 
            req.body.push(body)
            writeToFile(req.body)
            console.log(typeof body)
            res.statusCode = 201
            res.setHeader("Content-Type","application/json")
            res.write(
                JSON.stringify({Title:"Post Successfull"})
                )
            res.end()
            console.log(req.body)
        }
        catch(err)
        {
            res.writeHead(404,{"Content-Type":"application/json"})
            res.end(JSON.stringify({Title: "Validation error",Message : "Please input the appropriate method"}))
            console.log(err)
        }
    }



}