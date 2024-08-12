import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user ?? null);
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    // Cleanup the listener on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      if (user) {
        // Delete the provider tokens from the database
        const { error: deleteError } = await supabase
          .from("provider_tokens")
          .delete()
          .match({
            user_id: user.id,
            provider: user.app_metadata?.provider,
          });

        if (deleteError) {
          console.error("Error deleting provider tokens:", deleteError);
        } else {
          console.log("Provider tokens deleted successfully.");
        }
      }

      // Sign out the user
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Error during sign out:", err);
    }
  }, [user]);

  return { user, loading, handleSignOut };
};

export default useAuth;
