import { Router } from "express";
const router = Router();
import { findOne, create, matchedPasswordAndGenerateToken, findById, findByIdAndUpdate } from '../models/user';

router.post("/signup", async(req,res) => {

    try {
        const { fullName, password, email, phone, address } = req.body;

        const existingUser = await findOne({email});
        if(existingUser) {
            return res.status(400).json({ message: 'Email id already exists'});
        }

        await create({ fullName, password, email, phone, address });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
})

router.post("/signin", async(req,res) => {

    try {
        const { email, password } = req.body;

        const token = await matchedPasswordAndGenerateToken(email, password);
        res.cookie('token', token, {httpOnly: false});
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        res.status(400).json({ message: error.message});
    }
})

router.get("/myAccount", async(req,res) => {

    console.log("Before try")
    console.log(req.user);

    try {
        const user = await findById(req.user._id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.put("/editprofile", async (req,res) => {
    try {
        const { fullName, email, phone, address } = req.body;
        const user = await findByIdAndUpdate(req.user._id, { fullName, email, phone, address }, { new: true });
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;