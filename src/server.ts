import http, { IncomingMessage, Server, ServerResponse } from "http";
// import path from "path";
import config from "./config";
import { RouterHandler, routes } from "./helper/RouteHandle";
import "./routes";
import findDynamicRoute from "./helper/daynamicRouteHandler";



const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is runnign...");

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";
    const methodMap = routes.get(method);
    const handler: RouterHandler | undefined = methodMap?.get(path);
    if (handler) {
      handler(req, res);
    } else if (findDynamicRoute(method, path)) {
      const match = findDynamicRoute(method, path);
      (req as any).params = match?.params;
      match?.handler(req, res);
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          message: "Route is not found !!",
          path,
        })
      );
    }
    //  root route
    // if (req.url == "/" && req.method == "GET") {
    //   res.writeHead(200, { "content-type": "application/json" });
    //   res.end(
    //     JSON.stringify({
    //       message: "Hello from node js wiht typescript...",
    //       path: req.url,
    //     })
    //   );
    // }

    //  health route
    // if (req.url == "/api" && req.method == "GET") {
    //   res.writeHead(200, { "content-type": "application/json" });
    //   res.end(
    //     JSON.stringify({
    //       message: "Health status ok..",
    //       path: req.url,
    //     })
    //   );
    // }

    // user route
    // if (req.url == "/api/users" && req.method == "POST") {
    //   //  const user = {
    //   //     id: 1,
    //   //     name: 'Alice'
    //   //  }
    //   //     res.writeHead(200, {"content-type": "application/json"});
    //   //     res.end(JSON.stringify(user))

    //   let body = "";

    //   //  listen for data chunk
    //   req.on("data", (chunk) => {
    //     body += chunk.toString();
    //   });
    //   req.on("end", () => {
    //     try {
    //       const parseBody = JSON.parse(body);
    //       console.log(parseBody);
    //       console.log("catch body ");
    //       // res.end(parseBody)
    //       res.end(JSON.stringify(parseBody));
    //     } catch (error:any) {
    //       console.log(error?.message);
    //     }
    //   });
    //   // res.end(JSON.stringify({
    //   //     message: "Proccessing..."
    //   // }))
    // }
  }
);

server.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
