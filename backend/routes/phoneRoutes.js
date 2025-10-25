import { supabase } from "../config/database";
const router = express.Router()

router.post('/reg_phone', async(req, res) => {
    const { user_id, phone_number, imei_number, device_model, device_brand } = req.body;

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
            return res.status(201).json({success: true, message: "Phone registration successful"});
    } catch (error) {
        return res.status(500).json({success: false, error: "Server error"});
    }
});

router.get('/view-unique-phone/:user_id', async(req, res) => {
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


module.exports = router;