import { supabase } from "../config/database.js";

const authUser = async(req, res, next) => {
    const token = req.cookies['sb-access-token']
    
    if(!token) return res.status(400).json({success: false, message: "Something went wrong"});

    try {
        const { data, error } = await supabase.auth.getUser(token);
        if (error) res.status(401).json({success: false, message: "Something went wrong"});
        if (!data) res.status(401).json({success: false, message: "Failed to authenticate user"});

        req.user = data.user;
        next();
    } catch (error) {
        return res.status(403).json({success: false, message: "User authentication failed"});
    }
}

export default authUser;