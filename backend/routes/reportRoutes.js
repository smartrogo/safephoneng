//importing dependencies
import { supabase } from "../config/database";
import express from 'express';
import userAuth from '../authentication/userAuth';

//declaring routing
const router = express.Router();

//creating new report
router.post('/report_theft', async (req, res) => {
    const { imei_number, incident_type, incident_date, location, description, reporter_name } = req.body;

    try {
        const { data, error } = await supabase
        .from('theft_reports')
        .insert([imei_number, incident_type, incident_date, location, description, reporter_name])
        .select();

        if(error) return res.status(401).json({success: false, message: "Error adding report. Try later"});
        return res.status(201).json({success: true, message: "Record successfully added", data: data});

    } catch (error) {
        
    }
})

module.exports = router;