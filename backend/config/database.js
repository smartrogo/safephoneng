import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

//configuring .env 
dotenv.config();

//client setup for routes that doesn't require authentication
export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

//client setup for routes that require authentication
export const authClient = (accessToken) => {
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
    {
        global: {
            headers: {
                Authorization: `Bearer &{accessToken}`
            }
        }
    }
}