import { supabase } from "../config/database";

const authUser = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader) return res.status(401).json({success: false, message: "Something went wrong"});
    const userToken = authHeader.split(" ")[1];

    try {
        const { data, error } = await supabase.auth.getUser(userToken);
        if (error) res.status(401).json({success: false, message: "Something went wrong"});
        if (!data) res.status(401).json({success: false, message: "Failed to authenticate user"});

        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: "User authentication failed"});
    }
}

export default authUser;