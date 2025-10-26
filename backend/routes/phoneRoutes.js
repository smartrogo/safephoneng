//importing dependencies
import { supabase } from "../config/database";
import express from "express";

//declaring routing
const router = express.Router();

//new phone registration
router.post('/reg-new-phone', async(req, res) => {
    const { user_id, phone_number, imei_number, device_model, device_brand } = req.body;


    //checking for missing values in the request body
    if (!user_id || !phone_number || !imei_number){
        return res.status(400).json({success: false, message: "Missing value"});
    }
    try {
        const { data, error } = await supabase
            .from('phone_registrations')
            .insert([
                user_id,
                phone_number, 
                imei_number, 
                device_model || null,
                device_brand || null, 
            ])
            .select();

            if (error) return res.status(400).json({success: false, message: "Phone registration failed"});
            return res.status(201).json({success: true, message: "Phone registration successful", data: data});
    } catch (error) {
        return res.status(500).json({success: false, error: "Server error"});
    }
});


//retrieving all phones records registered by same user
router.get('/view-user-phones/:user_id', async(req, res) => {
    const { user_id } = req.params;

    if(!user_id) return res.status(400).json({success: false, message: "An error occurred"});

    try {
        const { data, error } = await supabase
        .from('phone_registrations')
        .select('*')
        .eq('user_id', auth.uid())

        if(error) return res.status(400).json({success: false, message: "Failed to fetch record"});
        return res.json(data);

    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"});
    }
});

router.put('/update-unique-phone/:user_id/status', async(req, res) => {
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

        if(error) return res.status(400).json({success: false, message: "status update failed"});
        return res.json(data);
    } catch (error) {
        
    }
})


module.exports = router;