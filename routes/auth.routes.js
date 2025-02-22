import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", (req, res) =>{
    res.send(        {
            "message":"Log"
        }
    )
});

export default authRouter;

