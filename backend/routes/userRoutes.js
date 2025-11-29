//importing dependencies
import { supabase } from "../config/database.js";
import express from 'express';
import userAuth from '../authentication/userAuth.js';

//declaring routing
const router = express.Router();

//new user profile registration
router.post('/reg_new_user', async(req, res) => {
    const { user_id, full_name, phone_number } = req.body;

    if(!user_id || !full_name || !phone_number) return res.status(400).json({success: false, message: "Missing value"});

    try {
        const { data, error } = await supabase
        .from('profiles')
        .insert([{user_id, full_name, phone_number}])
        .select()

        if(error) return res.status(401).json({success: false, message: error.message});
        return res.status(201).json({success: true, message: "User registration successful", data: data});
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"});
    }
});

//retrieving user profile
router.get('/view_user_profile/:user_id', userAuth, async(req, res) => {
    const { user_id } = req.params

    if(!user_id) return res.status(400).json({success: false, message: "Missing value"});

    try {
        const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user_id)
        .single()

        if(error) return res.status(401).json({success: false, message: "Failed to fetch user record"});
        return res.status(200).json({success: true, message: "", data: data});
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"});
    }
});

//updating a field in user profile
router.patch('/update_unique_user/:user_id/update_value', userAuth, async(req, res) => {
    const { user_id } = req.params;
    const { update_value } = req.body;

    if(!user_id || !update_value) res.status(400).json({success: false, message: "Missing values"});

    let update_field;

    if (update_value === full_name) update_field = full_name;
    update_field = phone_number;

    try {
        const { data, error } = await supabase
        .from('profiles')
        .update({ update_field })
        .eq('user_id', user_id)

        if(error) return res.status(401).json({success: false, message: "User update failed"});
        return res.status(200).json({success: true, message: "User update successful", data: data})
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"});
    }
});


export default router;