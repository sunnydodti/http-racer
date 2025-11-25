import { Router } from "express";
import { db } from "./server";
import { users } from "./db/schema";

const router = Router();
router.get('/users',async(req,res)=>{
    const result=await db.select().from(users);
    return res.json(result);
})

export default router;