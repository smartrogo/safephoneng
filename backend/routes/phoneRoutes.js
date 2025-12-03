//importing dependencies
import { supabase } from "../config/database.js";
import express from "express";
import userAuth from '../authentication/userAuth.js';

//declaring routing
const router = express.Router();

//new phone registration
router.post('/reg_new_phone', userAuth, async (req, res) => {

    const { phone_number, imei_number, device_model, device_brand } = req.body;


    //checking for missing values in the request body
    if (!phone_number || !imei_number)  return res.status(400).json({success: false, message: "Missing value"});

    try {
        const { data, error } = await supabase
            .from('phone_registrations')
            .insert([
                {
                    user_id: req.user.id,
                    phone_number, 
                    imei_number, 
                    device_model: device_model || null,
                    device_brand: device_brand || null,
                    status: "active",
                    registration_date: new Date()
                }
            ])
            .select();

            if (error) return res.status(401).json({success: false, message: `Phone registration failed, ${error.message}`});
            return res.status(201).json({success: true, message: "Phone registration successful", data: data});
    } catch (error) {
        return res.status(500).json({success: false, error: "Server error"});
    }
});


//retrieving all phones records registered by same user
router.get('/view_user_phones/:user_id', userAuth, async(req, res) => {
    const { user_id } = req.params;

    if(!user_id) return res.status(400).json({success: false, message: "An error occurred"});

    try {
        const { data, error } = await supabase
        .from('phone_registrations')
        .select('*')
        .eq('user_id', auth.uid())

        if(error) return res.status(401).json({success: false, message: "Failed to fetch record"});
        return res.status(200).json({success: true, message: "", data: data});

    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"});
    }
});

router.patch('/update_unique_phone/:user_id/status', userAuth, async(req, res) => {
    const { user_id } = req.params;
    const { status } = req.body;

    if (!user_id || !status) {
        return res.status(400).json({success: false, message: "Missing value"})
    }

    try {
        const { data, error } = await supabase
        .from('phone_registrations')
        .update({ status })
        .eq('user_id', auth.uid())
        .select()

        if(error) return res.status(401).json({success: false, message: "status update failed"});
        return res.status(200).json({success: true, message: "Update successful", data: data});
    } catch (error) {
        return res.status(500).json({success: false, message:"Server error"});
    }
})


export default router;