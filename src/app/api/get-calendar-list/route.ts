import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { createClient } from "@/utils/supabase/server";
import { getProviderTokens } from "@/utils/supabase/getProviderTokens";

export async function GET(request: NextRequest) {
  const {provider_token, provider_refresh_token} = await getProviderTokens();

  //console.log("provider Token data: ", providerTokenData);

 

  //console.log("acess toekn, refresh token ", accessToken, refreshToken);
  if (!provider_token || !provider_refresh_token) {
    return new NextResponse("Invalid session tokens", {
      status: 401,
    });
  }

  const clientId = process.env.AUTH_GOOGLE_ID;
  const clientSecret = process.env.AUTH_GOOGLE_SECRET;

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({
    access_token: provider_token,
    refresh_token: provider_refresh_token,
  });

  try {
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const calendarList = await calendar.calendarList.list();
    const calendars = calendarList.data?.items?.map((calendar, index) => ({
      id: index + 1,
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
}
