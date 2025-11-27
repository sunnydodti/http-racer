import { Router } from "express";
import { db } from "./server";
import { users } from "./db/schema";
import z, { int, number, string } from "zod";


const userSchema=z.object({
    name:string().min(5),
    email:string().email(),
    age:number().min(5)
})

const router = Router();
router.get('/users',async(req,res)=>{
    const result=await db.select().from(users);
    return res.json(result);
})

router.post('/users',async(req,res)=>{
    const {name,email,age}=await userSchema.parse(req.body);
    console.log(name)
    const result=await db.insert(users).values({name,email,age}).returning();
    return res.json(result)
})

export default router;