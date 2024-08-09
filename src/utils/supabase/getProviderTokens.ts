import { createClient } from "@/utils/supabase/server";

interface ProviderTokens {
  provider_token: string | null;
  provider_refresh_token: string | null;
}

export async function getProviderTokens(): Promise<ProviderTokens> {
  const supabase = createClient();

  // Retrieve the session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Unauthorized: No active session found.");
  }

  // Fetch provider tokens for the user
  const { data: providerTokenData, error: providerTokenError } = await supabase
    .from("provider_tokens")
    .select("provider_token, provider_refresh_token")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (providerTokenError) {
    console.error("Error fetching provider tokens:", providerTokenError);
    throw new Error("Failed to retrieve tokens.");
  }

  const provider_token = providerTokenData?.provider_token || null;
  const provider_refresh_token =
    providerTokenData?.provider_refresh_token || null;

  return { provider_token, provider_refresh_token };
}
