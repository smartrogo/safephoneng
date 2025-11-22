//importing dependencies
import { supabase } from "../config/database.js";
import express from "express";

const router = express.Router();

router.post('/login', async(req, res) => {
    //get user email and password from the request body
    const { email, password } = req.body;

    //handle errors for empty fields
    if(!email || !password) return res.status(400).json({success: false, message: "Invalid credentials"});

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if(error) return res.status(401).json({success: false, message: "Login error"});
        
        //setting user tracking parameters with supabase and express cookie
        res.cookie('sb-access-token', data.session.access_token, {});
        res.cookie('sb-refressh-token', data.session.refresh_token, {});

        return res.status(200).json({success: true, message: "Login successful", user: data.user});
    } catch (error) {
        return res.status(500).json({success: true, message: "Something went wrong"});
    }
});

router.post('/logout', async (req, res) => {
    res.clearCookie('sb-access-token');
    res.clearCookie('sb-refressh-token');

    res.status(200).json({success: true, message: "Logout suceessfull"});
});


export default router;