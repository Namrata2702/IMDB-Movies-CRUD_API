const writeToFile = require("../util/writeToFile")

module.exports = (req,res) => {
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
            console.log(req.body.splice(index,1))
            req.body.splice(index,1)
            writeToFile(req.body)
            res.writeHead(204,{"Content-Type":"application/json"})
            res.end(JSON.stringify({Title: "Movie found",Message : "Movie successfully deleted"}))
        }
    }
}