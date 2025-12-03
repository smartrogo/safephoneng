import { supabase, authClient } from "../config/database.js";

const userAuth = async (req, res, next) => {
    //get the authorization header from the request
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json({success: false, message: "Authorization header missing"});

    //get the token from the header
    const accessToken = authHeader.split(" ")[1];
    
    //setting user access scope
    const accessScope = authClient(accessToken);

    try{
        const { data, error } = await supabase.auth.getUser(accessToken);

        if(error || !data?.user) return res.status(401).json({success: false, message: "Invalid token"});

        req.user = data.user;
        req.supabase = accessScope;

        next();
    } catch(error){
        return res.status(500).json({success: false, message: "Server error, try later"});
    }
};

export default userAuth;