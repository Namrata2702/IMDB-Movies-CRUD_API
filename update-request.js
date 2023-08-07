const bodyParser = require("../util/body-parser")
const writeToFile = require("../util/writeToFile")

module.exports = async(req,res) => {
    let baseUrl = req.url.substring(0,req.url.lastIndexOf("/")+1)
    //console.log(baseUrl)
    let id = req.url.split("/")[3]
    let regex = new RegExp('tt[0-9]{7}')
    if(!regex.test(id))
    {
        res.writeHead(404,{"Content-Type":"application/json"})
        res.end(JSON.stringify({Title: "ID not found",Message : "Please input the appropriate imdb id"}))
        res.end()
    }
    else if(baseUrl==='/api/movies/'&&regex.test(id))
    {
        try{
            let body = await bodyParser(req)
            const index = req.body.findIndex((movie) => {
                return movie.imdbID === id 
            })
            if(index === -1)
            {
                res.statusCode=404
                res.end(JSON.stringify({Title: "Movie not found",Message : "Please input the appropriate imdb id"}))
                res.end()
    
            }
            else{
                //req.body[index] = {imdbID:id, ...body}
                for (const field in body) {
                    if (field !== 'imdbID') {
                        req.body[index][field] = body[field];
                    }
                }
                writeToFile(req.body)
                res.writeHead(200,{"Content-Type":"application/json"})
                res.end(JSON.stringify(req.body[index]))
            }
        }
        catch(err)
        {
            console.log(err)
            res.writeHead(404,{"Content-Type":"application/json"})
            res.end(JSON.stringify({Title: "Validation error",Message : "Please input the appropriate body"}))
            console.log(err)
        }
    }
    else
    {
        res.writeHead(404,{"Content-Type":"application/json"})
        res.end(JSON.stringify({Title: "Method Not Found",Message : "Please input the appropriate method"}))
    } 
    
}

