//importing dependencies
import { supabase } from "../config/database";
import express from 'express';

//declaring routing
const router = express.Router();

//new user profile registration
router.post('/reg-new-user', async(req, res) => {
    const { user_id, full_name, phone_number } = req.body;

    if(!user_id) return res.status(400).json({success: false, message: "Missing value"});

    try {
        const { data, error } = await supabase
        .from('profiles')
        .insert([{user_id, full_name, phone_number}])
        .select()

        if(error) return res.status(401).json({success: false, message: "User registration failed"});
        return res.status(201).json({success: true, message: "User registration successful", data: data});
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"});
    }
});

//retrieving user profile
router.get('/view-user-profile/:user_id', async(req, res) => {
    const { user_id } = req.params

    if(!user_id) return res.status(400).json({success: false, message: "Missing value"});

    try {
        const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', auth.uid())
        .single()

        if(error) return res.status(401).json({success: false, message: "Failed to fetch user record"});
        return res.status(200).json({success: true, message: "", data: data});
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"});
    }
});

//updating a field in user profile
router.put('/update-unique-user/:user_id/update_value', async(req, res) => {
    const { user_id } = req.params;
    const { update_value } = req.body;

    let update_field;

    if (update_value === full_name) update_field = full_name;
    update_field = phone_number;

    try {
        const { data, error } = await supabase
        .from('profiles')
        .update({ update_field })
        .eq('user_id', auth.uid())

        if(error) return res.status(401).json({success: false, message: "User update failed"});
        return res.status(200).json({success: true, message: "User update successful", data: data})
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"});
    }
});


module.exports = router;