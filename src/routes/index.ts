import { write } from "fs"
import { readUsers, wirteUsers } from "../helper/fileDb"
import parseBody from "../helper/parse-body"
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


addRoutes("POST", "/api/users", async(req,res)=>{
    const body = await parseBody(req);
    const users = readUsers()
    const newUser = {
        id: Date.now(),
        ...body,
    };
    users.push(newUser)
    wirteUsers(users)
    sendJson(res, 201, {success: true,data:body})
})


addRoutes("PUT", "/api/users/:id", async(req,res)=>{
  const {id} = (req as any).params;
  const body = await parseBody(req);

  const users = readUsers()

  const index = users.findIndex((user: any)=> user.id == id);

  if(index == -1) {
    sendJson(res, 404, {
      success: false,
      message: "user not found "
    })
  }

  users[index] = {
    ...users[index],
    ...body
  };

  wirteUsers(users);

  sendJson(res, 202, {
    success: true,
    message: `id ${id} user updated`,
    data: users[index]
  })

})

