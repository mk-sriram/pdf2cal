import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { getProviderTokens } from "@/utils/supabase/getProviderTokens";

export async function POST(request: NextRequest) {
  try {
    //retriving providerToken from db
    const { provider_token, provider_refresh_token } =
      await getProviderTokens();
    //console.log("acess toekn, refresh token ", accessToken, refreshToken);
    //check for tokens
    if (!provider_token || !provider_refresh_token) {
      return new NextResponse("Invalid session tokens", {
        status: 401,
      });
    }

    //loading google secrets from Env
    const clientId = process.env.AUTH_GOOGLE_ID;
    const clientSecret = process.env.AUTH_GOOGLE_SECRET;

    //init oauthclient
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({
      access_token: provider_token,
      refresh_token: provider_refresh_token,
    });

    //Tasks API call.
    try {
      // Create an instance of the Google Tasks API
      const tasks = google.tasks({ version: "v1", auth: oauth2Client });

      // Get the user's task lists
      const response = await tasks.tasks.insert
    } catch (taskError) {
      console.error(
        "An error occurred while fetching or processing task lists:",
        taskError
      );
      return new NextResponse("Failed to retrieve or process task lists", {
        status: 500,
      });
    }
  } catch (error) {
    console.error("An error occurred with retriving provider tokens :", error);
  }

  //console.log("provider Token data: ", providerTokenData);
}
