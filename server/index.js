import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import  { dbConnection } from "./utils/index.js";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewares.js";
import routes from "./routes/index.js"
import client from "prom-client";

// default metrics (CPU, memory, etc.)
client.collectDefaultMetrics();
dotenv.config();

dbConnection();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
    cors({
        origin:["http://localhost:5173","http://localhost:3000","https://tassklyy.netlify.app"],
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials:true,
    }),
); // this is for handle the get,post,delete and put request from localhost:3000 or localhost:5173 on which our frontend run

app.use(express.json());
//This middleware function is used to parse incoming JSON payloads. 
// It allows your Express application to handle requests with Content-Type set to application/json. 
// Without this, your app wouldn't be able to understand JSON payloads in the body of incoming requests.
app.use(express.urlencoded({extended : true})) // This middleware function is used to parse incoming URL-encoded payloads (form submissions). The extended: true option allows for rich objects and arrays to be encoded into the URL-encoded format
app.use(cookieParser()) // This middleware function is used to parse cookies attached to the client request object. It makes the cookies accessible via req.cookies
app.use(morgan("dev")) // morgan is a logging middleware for Node.js. The "dev" option specifies the format of the logs,
//  which provides concise output colored by response status for development use. 
// It logs HTTP requests to the console, helping with debugging and monitoring.
app.use("/api",routes); // now we specify the base route /api on which we render the routes coming from the routes/index.js

// this route is for the prometheous monitoring 
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Health check route..added for Docker health checks && Kubernetes probes
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// here order matter of the route we are calling so at the end this below route should be there after the all route configuration
// other wise it shows route not found at the start if we put below two at the beginning...
app.use(routeNotFound);
app.use(errorHandler); // this is created by me these two function as the errorMiddleware


app.listen(PORT, () => console.log(`Server listning on ${PORT}`));
