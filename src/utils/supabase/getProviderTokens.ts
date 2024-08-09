import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function getProviderTokens() {
  const supabase = createClient();

  // Retrieve the session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  // Fetch provider tokens for the user
  const { data: providerTokenData, error: providerTokenError } = await supabase
    .from("provider_tokens")
    .select("provider_token, provider_refresh_token")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (providerTokenError) {
    console.error("Error fetching provider tokens:", providerTokenError);
    return new NextResponse("Failed to retrieve tokens", {
      status: 500,
    });
  }

  const provider_token = providerTokenData?.provider_token;
  const provider_refresh_token = providerTokenData?.provider_refresh_token;

  return { provider_token, provider_refresh_token };
}
