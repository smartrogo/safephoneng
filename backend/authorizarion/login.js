import { supabase } from "../config/database";

export const logUserWithPassword = async (req, res) => {
    //get user email and password from the request body
    const { email, password } = req.body;

    //handle errors for empty fields
    if(!email || !password) return res.status(400).json({success: false, message: "Invalid credentials"});

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if(error) return res.status(401).json({success: false, message: "Login error"});
        return res.status(200).json({
            success: true, 
            accessToken: data.session.access_token, 
            refreshToken: data.session.refresh_token
        })
    } catch (error) {
        
    }
}