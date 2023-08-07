module.exports = (req,res) => {
    
    let baseUrl = req.url.substring(0,req.url.lastIndexOf("/")+1)
    //console.log(baseUrl)
    let id = req.url.split("/")[3]
    let regex = new RegExp('tt[0-9]{7}')
    if(req.url === "/api/movies")
    {
        res.statusCode = 200
        res.setHeader("Content-Type","application/json")
        res.write(
            JSON.stringify(req.body)
            )
        res.end()
    }
    else if(!regex.test(id))
    {
        res.writeHead(404,{"Content-Type":"application/json"})
        res.end(JSON.stringify({Title: "ID not found",Message : "Please input the appropriate imdb id"}))
        res.end()
    }

    else if(baseUrl==='/api/movies/'&&regex.test(id))
    {        
        res.setHeader("Content-Type","application/json")
        let filteredMovie = req.body.filter((movie)=>{
            return movie.imdbID == id
        })
        if(filteredMovie.length==0)
        {
            res.statusCode=404
            res.end(JSON.stringify({Title: "Movie not found",Message : "Please input the appropriate imdb id"}))
            res.end()
        }
        else{
            res.statusCode=200
            res.write(
                JSON.stringify(filteredMovie[0])
            )
            res.end()
        }        
    }
    else{
        res.writeHead(404,{"Content-Type":"application/json"})
        res.end(JSON.stringify({Title: "Method Not Found",Message : "Please input the appropriate method"}))
    } 
    
}
