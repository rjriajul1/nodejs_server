import addRoutes from "../helper/RouteHandle"
import sendJson from "../helper/send-json"

addRoutes("GET", "/", (req, res)=> {
  sendJson(res,200, {
          message: "Hello from node js wiht typescript...",
          path: req.url,
        })

  // res.writeHead(200, { "content-type": "application/json" });
  //     res.end(
  //       JSON.stringify({
  //         message: "Hello from node js wiht typescript...",
  //         path: req.url,
  //       })
  //     );
   
})

addRoutes("GET", "/api", (req,res)=>{
    sendJson(res,200,{
          message: "Health status ok..",
          path: req.url,
        })
})
