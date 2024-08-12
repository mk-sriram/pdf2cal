import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { getProviderTokens } from "@/utils/supabase/getProviderTokens";

interface ProviderTokens {
  provider_token: string | null;
  provider_refresh_token: string | null;
}

export async function GET(request: NextRequest) {
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

    //Calendar API call.
    try {
      const calendar = google.calendar({ version: "v3", auth: oauth2Client });
      const calendarList = await calendar.calendarList.list();
      const calendars = calendarList.data?.items?.map((calendar) => ({
        id: calendar.id,
        color: calendar.backgroundColor,
        name: calendar.summary,
      }));
      //console.log("calendars: ", calendars);
      return NextResponse.json({ calendars });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching calendars", error);
        return new NextResponse(`Error fetching calendars: ${error.message}`, {
          status: 500,
        });
      } else {
        console.error("Error fetching calendars", error);
        return new NextResponse("Error fetching calendars", {
          status: 500,
        });
      }
    }
  } catch (error) {
    console.error("An error occurred with retriving provider tokens :", error);
  }

  //console.log("provider Token data: ", providerTokenData);
}
