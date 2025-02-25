import express from "express";
// import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";           
import subscriptionRouter from "./routes/subscription.routes.js";   
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express(); // create express app

app.use(express.json()); // parse json bodies
app.use(express.urlencoded({extended: false})); //parse url-encoded bodies
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use(errorMiddleware);


app.get("/", (req, res)=> {
    res.send("Hello World");
})

// app.listen( port :3000, hostname:()=>{
//     console.log("Server is running on port 3000")
// })
app.listen(PORT, async () => {    // listen for any incoming requests
    console.log(`Server is running on port http://localhost:${PORT}`);

    await connectToDatabase();
}
);