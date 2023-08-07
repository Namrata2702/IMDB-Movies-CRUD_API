const http = require("http");
require("dotenv").config()
const getReq = module.require('./methods/get-request.js')
const postReq = module.require('./methods/post-request')
const putReq = module.require('./methods/update-request')
const deleteReq = module.require('./methods/delete-request')
let movies = require("./data/movies1.json")



const PORT = process.env.PORT || 5000  

const server = http.createServer((req,res)=>{
    req.body = movies
    switch(req.method)
    {
        case "GET":
            getReq(req,res);
            break;

        case "POST":
            postReq(req,res);
            break;  

        case "PUT":
            putReq(req,res);
            break;  

        case "DELETE":
            deleteReq(req,res);
            break;  
            
        default :
            res.statusCode = 404
            res.setHeader("Content-Type","application/json")
            res.write(
                JSON.stringify({Title: "Method Not Found",Message : "Please input the appropriate message"})
                )
            res.end()
    }    
})

server.listen(PORT , ()=>{
    console.log(`Server successfully listening to port ${PORT}`)
})