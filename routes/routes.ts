import express, { Request, Response } from 'express';
import Auth from '../models/auth';

const router = express.Router()


router.post('/users', async (req: Request, res: Response) => {
    const users = await Auth.find({});
    res.json(users);
})

router.post('/users/:email', async (req: Request, res: Response) => {
    const user = await Auth.find({ email:  req.params.email});
    res.json(user);
})

router.post('/register', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const user = new Auth({
        name,
        email,
        password
    });
    const finduser = await Auth.find({ email });
    if (finduser[0]) return res.json("Duplicate Item")
    const saveduser = await user.save();
    res.json(saveduser);
})

router.delete('/remove/:email', async (req: Request, res: Response) => {
    const users = await Auth.findOneAndDelete({ email: req.params.email });
    res.json(users);
})

export default router;
