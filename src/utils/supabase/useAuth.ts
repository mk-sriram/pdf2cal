import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

import { Session } from '@supabase/supabase-js';
const useAuth = () => {
   const [session, setSession] = useState<Session | null>(null);
   

  useEffect(() => {
    const getSession = async () => {
      try {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        
        setSession(session);
        
      } catch (error) {
        console.error("Error getting session:", error);
       
      }
    };

    getSession();
  }, []);

  return { session };
};

export default useAuth;
