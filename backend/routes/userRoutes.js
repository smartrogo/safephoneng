//importing dependencies
import { supabase } from "../config/database.js";
import express from 'express';
import userAuth from '../authentication/userAuth.js';

//declaring routing
const router = express.Router();

//retrieving user profile
router.get('/view_user', userAuth, async(req, res) => {
    const reqId = req.user.id;

    try {
        const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', reqId)

        if(error) return res.status(401).json({success: false, message: "Failed to fetch user record"});
        return res.status(200).json({success: true, message: "Record fetched successfully", data: data});
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"});
    }
});

//updating a field in user profile
router.put('/update_user', userAuth, async(req, res) => {
    const { full_name, phone_number } = req.body;

    if(!full_name || !phone_number) return res.status(400).json({success: false, message: "Missing values"});

    try {
        const { data, error } = await supabase
        .from('profiles')
        .update({ full_name, phone_number })
        .eq('user_id', req.user.id)
        .select()
        .single()

        if(error) return res.status(401).json({success: false, message: "User update failed"});
        return res.status(200).json({success: true, message: "User update successful", data: data});

    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"});
    }
});


export default router;