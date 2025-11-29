//importing dependencies
import { supabase } from "../config/database.js";
import express from 'express';
import userAuth from '../authentication/userAuth.js';

//declaring routing
const router = express.Router();

//creating new report by new user or authenticated user
router.post('/report_theft', userAuth, async (req, res) => {
    const { imei_number, incident_type, incident_date, location, description, reporter_name } = req.body;

    try {
        const { data, error } = await supabase
        .from('theft_reports')
        .insert([imei_number, incident_type, incident_date, location, description, reporter_name])
        .eq('user_id', auth.uid() || null)
        .select();

        if(error) return res.status(401).json({success: false, message: "Error adding report. Try later"});
        return res.status(201).json({success: true, message: "Record successfully added", data: data});

    } catch (error) {
        
    }
});

//viewing all theft reports
router.get('/view_theft_reports', async (req, res) => {
    try {
        const { data, error } = await supabase
        .from('theft_reports')
        .select('*')
        .order('created_at', {ascending: false}) //sorting the data with newest first

        if(error) res.status(401).json({success: false, message: "Failed to fetch record"});
        res.status(200).json({success: true, message: "Record successfully fetched", data: data});
    } catch (error) {
        res.status(500).json({success: false, message: "Server error"});
    }
});

//users updating theft report
router.patch('/update_theft_report/:user_id/update_field', userAuth, async (req, res) => {
    const { user_id } = req.params;
    const { update_field } = req.body;

    if(!update_field || !user_id) res.status(400).json({success: false, message: "Missing values"});

    try {
        const { data, error } = await supabase
        .from('theft_reports')
        .update({ update_field })
        .eq('user_id', auth.uid())

        if(error) res.status(401).json({success: false, message: "Failed to update record"});
        res.status(201).json({success: true, message: "Update successful", data: data});
    } catch (error) {
        res.status(500).json({success: false, message: "Server error"});
    }
})

export default router;